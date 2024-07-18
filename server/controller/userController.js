import { User } from "../models/user.models.js"
import { ApiError } from "../utils/apiError.js"

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

        if (!name && !email && !password) return next(new ApiError("Incomplete Details", 400))

        const user = await User.create({ name, email, password, avatar: { public_id: "sample Id", url: "sample url" } })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if (!createdUser) {
            return next(new ApiError("Something went wrong while creating user", 500))
        }

        //once user registered , log him in(create access and refresh tokens for that user)
        const { AT, RT } = await generateTokens(user._id);

        const options = {
            expires : new Date(Date.now + (process.env.COOKIE_EXPIRE *24*60*60*1000)) ,
            httpOnly: true,
            secure: true
        }
        
        return res.status(201).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, createdUser })

    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return next(new ApiError("Email and password is Required", 400))
        }

        const user = await User.findOne({ email: email })

        if (!user) return next(new ApiError("No user exists with the given email", 400))

        if (user.isPasswordCorrect(password) === false) {
            return next(new ApiError("Invalid Password", 400))

        }

        const { AT, RT } = await generateTokens(user._id)
        const options = {
            httpOnly: true,
            secure: true
        }

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, userObject })

    } catch (error) {
        return next(new ApiError("error while logging in", 500))
    }
}

export { registerUser, loginUser }