import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/add-item/:id').post(verifyJWT)



export default router