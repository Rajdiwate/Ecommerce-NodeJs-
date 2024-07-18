import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
        console.log("Mongo db Connected to" , connectionInstance.connection.name)
    } catch (error) {
        console.log("Mongo db connection failed" ,error.message)
        process.exit(1)
    }
}

export {dbConnect}