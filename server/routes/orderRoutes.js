import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middleware/auth.middleware.js";
import { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } from "../controller/orderController.js";

const router = Router();

router.route('/order/new').post(verifyJWT, createOrder)

router.route('/order/:id').get(verifyJWT, getSingleOrder)

router.route('/orders/me').get(verifyJWT, myOrders)

router.route('/admin/orders').get(verifyJWT, authorizeRoles("admin"), getAllOrders)

router.route('/admin/order/:id')
    .put(verifyJWT, authorizeRoles("admin"), updateOrderStatus)
    .delete(verifyJWT, authorizeRoles("admin"), deleteOrder)


export default router