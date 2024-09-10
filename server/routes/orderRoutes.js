import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middleware/auth.middleware.js";
import { createOrder, getSingleOrder, myOrders } from "../controller/orderController.js";

const router = Router();

router.route('/order/new').post(verifyJWT , createOrder )
router.route('/order/:id').get(verifyJWT , getSingleOrder)
router.route('/orders/me').get(verifyJWT ,myOrders )

export default router