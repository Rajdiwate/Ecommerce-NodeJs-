import { User } from "../models/user.models.js"
import { ApiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"

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

        if (!name || !email || !password) return next(new ApiError("Incomplete Details", 400))

        const user = await User.create({ name, email, password, avatar: { public_id: "sample Id", url: "sample url" } })

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

        return res.status(201).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, createdUser })

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

//Login
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

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return next(new ApiError("old and new password is required", 400))
        }

        const user = await User.findById(req.user._id)
        const isCorrectPassword = await user.isPasswordCorrect(oldPassword)
        if (!isCorrectPassword) {
            return next(new ApiError("Wrong Password", 400))
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password Changed"
        })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

export { registerUser, loginUser, logoutUser, refreshAccessToken, changePassword }