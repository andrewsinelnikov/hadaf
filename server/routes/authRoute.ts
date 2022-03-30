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

export default router;
