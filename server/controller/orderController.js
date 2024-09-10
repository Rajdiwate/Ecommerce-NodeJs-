import { Order } from "../models/orders.models.js";
import { Product } from "../models/product.models.js"
import { ApiError } from "../utils/apiError.js";

// Create a new Order
const createOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        //Search if orderitems.produc exists
        orderItems.forEach(async (item) => {
            const product = await Product.findById(item.product)
            if (!product) {
                return next(new ApiError("No such Product exists", 404))
            }
        });



        const order = await Order.create({ shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id })
        res.status(201).json({ success: true, order })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

//Get Single Order
const getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email") 
        //populate adds user : {_id , name , email} details insted of only  user : id 
        if (!order) {
            return next(new ApiError("Order not found", 404));
        }
        return res.status(200).json({ success: true, order })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

//Get logged in user Orders
const myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({user : req.user._id}) 
        
        return res.status(200).json({ success: true, orders })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

//get All Orders --Admin
const getAllOrders = async(req,res,next)=>{
    try {
        const orders = await Order.find();
        
        let totalAmount = 0;
        orders.forEach((order)=>{
            totalAmount+=order.totalPrice
        })
        return res.status(200).json({success : true ,totalAmount, orders})
    } catch (error) {
        return next(new ApiError(error.message , 400))
    }
}

//update order Status -- Admin
const updateOrderStatus = async(req,res,next)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id , {$set:{orderStatus : req.body.orderStatus}});
        if(!order){
            return next(new ApiError("No Order found" , 404));
        }

        return res.status(200).json({success : true , order})

    } catch (error) {
        return next(new ApiError(error.message , error.code ||400))
    }
}


export { createOrder, getSingleOrder , myOrders , getAllOrders , updateOrderStatus}