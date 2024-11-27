import { Router } from "express";
import {  verifyJWT } from "../middleware/auth.middleware.js";
import { addToCart, getCartDetails, removeItem, updateQuantity } from "../controller/cartController.js";

const router = Router()

router.route('/add-item').post(verifyJWT , addToCart)
router.route('/get-cart').get(verifyJWT , getCartDetails)
router.route('/update-quantity').put(verifyJWT , updateQuantity)
router.route('/remove-item').put(verifyJWT , removeItem)



export default router