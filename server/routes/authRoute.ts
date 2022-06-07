import express from "express";
import authCtrl from "../controllers/authCtrl";
import { validateRegister } from "../middleware/valid";

const router = express.Router();

// @route  POST api/register
// @desc   Register user
// @access Public
router.post("/register", validateRegister, authCtrl.register);

// @route  POST api/active
// @desc   Active account
// @access Public
router.post("/active", authCtrl.activeAccount);

// @route  POST api/login
// @desc   Login user
// @access Public
router.post("/login", authCtrl.login);

// @route  GET api/logout
// @desc   Logout user
// @access Public
router.get("/logout", authCtrl.logout);

// @route  GET api/refresh_token
// @desc   Refresh Token
// @access Public
router.get("/refresh_token", authCtrl.refreshToken);

// @route  POST api/google_login
// @desc   Google Login
// @access Public
router.post("/google_login", authCtrl.googleLogin);

// @route  POST api/facebook_login
// @desc   Facebook Login
// @access Public
router.post("/facebook_login", authCtrl.facebookLogin);

// @route  POST api/login_sms
// @desc   Login SMS
// @access Public
router.post("/login_sms", authCtrl.loginSMS);

// @route  POST api/sms_verify
// @desc   SMS Verify
// @access Public
router.post("/sms_verify", authCtrl.smsVerify);

export default router;
