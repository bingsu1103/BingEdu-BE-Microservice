const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/register", authController.registerAPI);
router.post("/login", authController.loginAPI);
router.post("/refresh_token", authController.refreshAccessTokenAPI);
router.post("/logout", verifyToken, authController.logoutAPI);
router.get("/account", verifyToken, authController.fetchAccountAPI);
router.post("/forgot_password", authController.forgotPasswordAPI);
router.post("/verifyOTP", authController.verifyOTPAPI);
router.post("/reset_password", authController.resetPasswordAPI);
router.post("/check_permission", authController.checkPermissionAPI);

module.exports = router;
