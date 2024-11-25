import { User } from "../models/user.models.js"
import { ApiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js"
import crypto from "crypto"
import { deleteCloudinary, uploadToCloudinary } from "../utils/Cloudinary.js"
import fs from 'fs'



//generate Access and Refresh TOkens
const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const AT = await user.generateAccessToken();
        const RT = await user.generateRefreshToken();
        user.refreshToken = RT
        await user.save({ validateBeforeSave: false })
        return { AT, RT }
    } catch (error) {
        throw new ApiError("something went Wrong while generating tokens", 500)
    }
}

//Register a user
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        var avatarLoacalPath = null;
        if(req.files){
            if(req.files.avatar){
                avatarLoacalPath = req.files.avatar[0].path;
            }
        }
        // console.log(avatarLoacalPath);
        
        if (!name || !email || !password) return next(new ApiError("Incomplete Details", 400))

        const temp = await User.findOne({ email: email });
        if (temp) {
            if(avatarLoacalPath) fs.unlinkSync(avatarLoacalPath)
            return next(new ApiError("User with this email already Exists", 400))
        }

        // Upload to cloudinary if avatat exists
        let user = null;
        if (avatarLoacalPath) {
            const avatarInstance = await uploadToCloudinary(avatarLoacalPath)
            try {
                user = await User.create({ name, email, password, avatar: { public_id: avatarInstance.public_id, url: avatarInstance.url } })
            } catch (error) {
                const avatarId = avatarInstance?.public_id
                await deleteCloudinary(avatarId);
                return next(new ApiError(error.message, 400));
            }
        }
        else {
            user = await User.create({ name, email, password }) // create user without avatar
        }


        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if (!createdUser) {
            return next(new ApiError("Something went wrong while creating user", 500))
        }

        //once user registered , log him in(create access and refresh tokens for that user)
        const { AT, RT } = await generateTokens(user._id);

        const options = {
            expires: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            // secure: true
        }
        return res.status(201).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, user:createdUser })

    } catch (error) {
        
        return next(new ApiError(error.message, 400))
    }
}

//Login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ApiError("Email and password is Required", 400))
        }

        const user = await User.findOne({ email: email })

        if (!user) return next(new ApiError("No user exists with the given email", 400))

        const isCorrectPassword = await user.isPasswordCorrect(password)
        if (!isCorrectPassword) {
            return next(new ApiError("Invalid Password", 400))

        }

        const { AT, RT } = await generateTokens(user._id)
        const options = {
            maxAge: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            // secure: true
        }

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, userObject })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

//Logout
const logoutUser = async (req, res, next) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, {
            $set: { refreshToken: undefined }
        })

        const options = {
            expires: new Date(0),
            httpOnly: true,
            // secure: true
        }
        res.status(200)
            .clearCookie("accessToken", null, options)
            .clearCookie("refreshToken", null, options)
            .json({ success: true, message: "user logged out" })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

//refresh Access Token
const refreshAccessToken = async (req, res, next) => {
    const incommingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
    if (!incommingRefreshToken) return next(new ApiError("Unauthorized Request", 401))

    try {
        const decodedToken = jwt.verify(incommingRefreshToken.trim(), process.env.REFRESH_TOKEN_SECRET)
        const userId = decodedToken._id;

        const user = await User.findById(userId);
        if (!user) return next(new ApiError("Invalid Token", 400))

        //check if the incoming refreshToken is same as that stored in db
        if (incommingRefreshToken.trim() != user.refreshToken) return next(new ApiError("Refresh Token is expired or Used", 400));

        const { AT, RT } = generateTokens(userId);

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({
            success: true,
            message: "Tokens generated"
        })

    } catch (error) {
        next(new ApiError(error.message, 500))
    }

}

//change Password
const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return next(new ApiError("old and new password and confirm Password  is required", 400))
        }

        if (newPassword !== confirmPassword) return next(new ApiError("passwords dosent match", 400));

        const user = await User.findById(req.user._id)
        const isCorrectPassword = await user.isPasswordCorrect(oldPassword)
        if (!isCorrectPassword) {
            return next(new ApiError("Wrong Password", 400))
        }
        user.password = newPassword;
        await user.save();

        //login the user
        const { AT, RT } = await generateTokens(user._id)
        const options = {
            maxAge: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            // secure: true
        }

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, userObject })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

//forgot Password
const forgotPassword = async (req, res, next) => {
    try {
        //get the user who wants to change the password
        const user = await User.findOne({ email: req.body.email })
        
        if (!user) {
            return next(new ApiError("user not found", 404));
        }

        //get reset Password Token
        const resetToken = await user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${req.get("Origin")}/password/reset/${resetToken}`

        const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`

        try {

            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery`,
                message
            })


            res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpiry = undefined
            await user.save()
            return next(new ApiError(error.message, 500))
        }

    } catch (error) {
        next(new ApiError(error.message, 500));
    }
}

//reset Pasword
const resetPassword = async (req, res, next) => {
    try {
        //creating token hash
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
        //search user using hased token

        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return next(new ApiError("Reset Password Token is Invalid or has been Expired", 404))
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ApiError("password dosent match", 400))
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpiry = undefined
        await user.save();

        //login User
        const { AT, RT } = await generateTokens(user._id)
        const options = {
            maxAge: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            // secure: true
        }

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, user : userObject })


    } catch (error) {
        next(new ApiError(error.message, 500))
    }
}

//get user details
const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken")
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

//update user details
const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        let avatarLoacalPath = null
        if(req.files){
            if(req.files.avatar){
                avatarLoacalPath = req.files.avatar[0].path;
            }
        }
        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;


        if(avatarLoacalPath){
            const oldUser =  await User.findById(req.user._id);
            if(oldUser.avatar){
                await deleteCloudinary(oldUser.avatar.public_id);
            }

            const uploadedAvatar = await uploadToCloudinary(avatarLoacalPath)
            updateFields.avatar = {public_id : uploadedAvatar.public_id , url: uploadedAvatar.url}
            
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updateFields },
            { runValidators: true, new: true }
        ).select("-password -refreshToken");

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
};

//Get All Users (Admin)
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

// Get Single User  (Admin)
const getDetails = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).select("-password -refreshToken");
        if (!user) {
            return next(new ApiError("No user Found", 400))
        }

        return res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

//Update User Role (Admin)
const updateUserRole = async (req, res, next) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id, userData, { new: true, runValidators: true })
        if(!user){
            return next(new ApiError("No Such user exists" , 400))
        }

        return res.status(200).json({ success: true, user })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

// Delete User (Admin)
const deleteUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id)
        if(!user){
            return next(new ApiError("No user Exists" , 400))
        }

        await deleteCloudinary(user.avatar?.public_id);
        await User.deleteOne(req.params.id)

        return res.status(200).json({ success: true , message : "User deleted Successfully" })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

export { registerUser, loginUser, logoutUser, refreshAccessToken, changePassword, forgotPassword, resetPassword, getCurrentUser, updateProfile, getAllUsers, getDetails, updateUserRole, deleteUser }