import { Router } from "express";
import { loginUser, registerUser , logoutUser,refreshAccessToken, changePassword} from "../controller/userController.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJWT ,logoutUser )
router.route('/refreshToken').post(refreshAccessToken)
router.route('/changePassword').post(verifyJWT ,changePassword)

export default router