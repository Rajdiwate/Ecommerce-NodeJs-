import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } from "../controller/productController.js";
import { verifyJWT  , authorizeRoles} from "../middleware/auth.middleware.js";

const router = Router()

router.route('/product').get(getAllProducts)
router.route('/product/new').post( verifyJWT , authorizeRoles("admin") ,createProduct)
router.route('/product/:id').put( verifyJWT , authorizeRoles("admin") ,updateProduct).delete( verifyJWT ,authorizeRoles("admin") ,deleteProduct).get(getProductDetails)

export default router