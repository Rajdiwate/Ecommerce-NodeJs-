import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import errorMiddleware from './middleware/error.js'

export const app = express();

app.use(express());

dotenv.config()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : '30mb' , extended : true})) // works same as body parser
app.use(express.urlencoded({limit: '30mb' , extended: true}))
app.use(cookieParser())


//Routing
import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from  './routes/orderRoutes.js'

app.use('/api' , productRouter)
app.use('/api' , userRouter)
app.use('/api' , orderRouter)

//Middleware for error
app.use(errorMiddleware)
