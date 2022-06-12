import express from "express";
import categoryCtrl from "../controllers/categoryCtrl";
import auth from "../middleware/auth";

const router = express.Router();

// @route  GET, POST api/category
// @desc   Create category
// @access Private
router.route("/category").post(auth, categoryCtrl.createCategory);

export default router;
