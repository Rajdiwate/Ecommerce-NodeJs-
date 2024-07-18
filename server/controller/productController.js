import { Product } from "../models/product.models.js"
import { ApiError } from "../utils/apiError.js"
import { ApiFeatures } from "../utils/apiFeatures.js"


// Create Products --- ADMIN ROUTE
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        return res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

// Get All Products
const getAllProducts = async (req, res, next) => {
    try {
        const resultsPerPage = 3;
        const productCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product.find(), req.query) //to search/filter a specific keyword
        .search()
        .filter()
        .pagination(resultsPerPage) 
        console.log(apiFeature)
        const products = await apiFeature.query;
        return res.status(200).json({
            success: true,
            products,
            productCount
        })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

//Get Product Details
const getProductDetails = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if (!product) {
            return next(new ApiError("No such Product Exists", 404))
        }
        return res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

// Update Product --- ADMIN ROUTE
const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true })
        if (!product) {
            return next(new ApiError("No such Product Exists", 404))
        }
        return res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

//Delete Product ---ADMIN ROUTE
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if (!product) {
            return next(new ApiError("No such Product Exists", 404))
        }
        await Product.deleteOne({ _id: productId })
        return res.status(200).json({
            success: true,
            message: "Product Deleted"
        })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

export { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails }