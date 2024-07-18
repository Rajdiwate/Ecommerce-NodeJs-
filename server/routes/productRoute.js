import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } from "../controller/productController.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/product').get( verifyJWT ,getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)

export default router