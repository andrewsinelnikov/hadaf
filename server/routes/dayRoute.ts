import express from "express";
import dayCtrl from "../controllers/dayCtrl";
import auth from "../middleware/auth";

const router = express.Router();

// @route  POST api/day
// @desc   Create / Get day's plan
// @access Private
router.route("/day").post(auth, dayCtrl.createDay).get(auth, dayCtrl.getDay);

export default router;
