import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"

export const verifyJWT = async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "");

        if(!token){
            return next(new ApiError("Please Login to Access" ,401))
        }
        
        const decodedToken = jwt.verify(token.trim() , process.env.ACCESS_TOKEN_SECRET )
        
        const user = await User.findById(decodedToken?._id).select('-refershToken')

        if(!user){
            throw new ApiError(401 , "Access Token is Invalid or Expired")
        }

        req.user = user;
        next()

    } catch (error) {
        return new ApiError(error?.message || " Invalid Access Token" )
    }
}

export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){  //should run for req.user.role == "user"
            // if req.user.role == "user"  then this if condition will be !false=>true
            //but if role is admin,then roles.include("admin") =>  !true=> false (this will not enter the if block)

            next(new ApiError(`Role ${req.user.role} is not allowed to access this resource` , 403))
        }
        next();
    }
}