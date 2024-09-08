import { Router } from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken, changePassword, forgotPassword, resetPassword, getCurrentUser, updateProfile, getAllUsers, getDetails , updateUserRole , deleteUser } from "../controller/userController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route('/register').post(upload.fields([{name : "avatar" }]) , registerUser)

router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(verifyJWT, logoutUser)

router.route('/refreshToken').post(refreshAccessToken)

router.route('/password/update').put(verifyJWT, changePassword)

router.route('/me').get(verifyJWT, getCurrentUser)

router.route('/me/update').put(verifyJWT,upload.fields([{name : "avatar"}]), updateProfile)

router.route('/admin/users').get(verifyJWT, authorizeRoles("admin"), getAllUsers)

router.route('/admin/user/:id')
    .get(verifyJWT, authorizeRoles("admin"), getDetails)
    .put(verifyJWT , authorizeRoles("admin") , updateUserRole)
    .delete(verifyJWT , authorizeRoles("admin") , deleteUser)

export default router