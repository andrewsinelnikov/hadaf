import express from "express";
import dayCtrl from "../controllers/dayCtrl";
import auth from "../middleware/auth";

const router = express.Router();

// @route  POST api/day
// @desc   Create day's plan
// @access Private
router.route("/day").post(auth, dayCtrl.createDay);

export default router;
