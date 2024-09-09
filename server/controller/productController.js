import { Product } from "../models/product.models.js"
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/apiError.js"
import { ApiFeatures } from "../utils/apiFeatures.js"


// Create Products --- ADMIN ROUTE
const createProduct = async (req, res, next) => {
    try {
        req.body.user = req.user._id
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

//create a review or update a review
const createReview = async (req, res, next) => {
    try {
        const { productId, ratings, comment } = req.body

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(ratings),
            comment
        }

        const product = await Product.findById(productId)
        if (!product) {
            return next(new ApiError("No product exists", 401))
        }

        //check if review is done already by this user
        const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

        if (isReviewed) 
        {
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString()) {
                    rev.rating = Number(ratings)
                    rev.comment = comment
                }
            })
        }
        else
        {
            product.reviews.push(review) //Push the newly created review into the array of reviews
            product.numOfReviews = product.reviews.length
        }

        //update ratings of product (avg of all ratings)
        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating;
        });
        product.ratings = avg / product.reviews.length;

        await product.save({validateBeforeSave:false})

        return res.status(200).json({ success: true, product })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

// get all reviews of a product
const getProductReviews = async(req,res,next)=>{
    try {
        
        const product  = await Product.findById(req.query.id);
        if(!product){
            return next(new ApiError("No such product exists" , 404));
        }

        const allReviews = product.reviews;

        return res.status(200).json({success:true , reviews: allReviews})



    } catch (error) {
        return next(new ApiError(error.message , 400))
    }
}

const deleteReview = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.query.productId)
        if(!product){
            return next(new ApiError("No such product exists" , 404))
        }

        //filter reviews that we dont want to delete
        const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString());
        console.log(reviews);
        
        //calculate new ratings
        let sum = 0;
        let length = 0;
        reviews.forEach((rev)=>{
            sum+= rev.rating;
            length+=1;
        })

        //update the product
        product.ratings = length>0? sum/length : 0
        product.numOfReviews = length
        product.reviews = reviews;
        await product.save({validateBeforeSave:false});

        return res.status(200).json({success : true});  

    } catch (error) {
        return next(new ApiError(error.message , 400))
    }
}

export { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createReview , getProductReviews  ,deleteReview}