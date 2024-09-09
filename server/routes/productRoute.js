import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails , createReview, getProductReviews, deleteReview } from "../controller/productController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/product').get(getAllProducts)

router
    .route('/admin/product/new')
    .post(verifyJWT, authorizeRoles("admin"), createProduct)

router
    .route('/admin/product/:id')
    .put(verifyJWT, authorizeRoles("admin"), updateProduct)
    .delete(verifyJWT, authorizeRoles("admin"), deleteProduct)

router.route('/product/:id').get(getProductDetails)

router.route('/review').put(verifyJWT , createReview)
router.route('/reviews').get( getProductReviews).delete(verifyJWT , deleteReview)

export default router