import express from "express";
import auth from "../middleware/auth";
import userCtrl from "../controllers/userCtrl";

const router = express.Router();

// @route  PATCH api/user
// @desc   Update User
// @access Private
router.patch("/user", auth, userCtrl.updateUser);

// @route  PATCH api/reset_password
// @desc   Reset Password
// @access Private
router.patch("/reset_password", auth, userCtrl.resetPassword);

export default router;
