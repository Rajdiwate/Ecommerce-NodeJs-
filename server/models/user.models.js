import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import crypto from "crypto"



const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Nmae cannot exceed 30 chars"],
        minLength: [2, "Nmae should have more than 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validator: [validator.isEmail, " Please Enter a Valid Email"]
    },
    password: {
        type: String,
        required: [true, "ENter Your Password"],
        minLength: [8, "Password should be grater tha 8 characters"],
    },
    avatar:
    {
        public_id: {
            type: String,
            required: function() { return this.avatar && this.avatar.public_id; }
        },
        url: {
            type: String,
            required: function() { return this.avatar && this.avatar.url; } 
        }
    },
    role: {
        type: String,
        default: "user"
    },
    refreshToken: {
        type: String,
        // select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date

}, { timestamps: true })


userSchema.pre("save", async function (next) {     //we cannot use arrow function here because we will not be able to access 'this'
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
//Generatiing password reset token
userSchema.methods.getResetPasswordToken = function () {
    //Generating Token  
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000
    return resetToken
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name
        },

        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema)