import express from "express";
import categoryCtrl from "../controllers/categoryCtrl";
import auth from "../middleware/auth";

const router = express.Router();

// @route  GET, POST api/category
// @desc   Get, Create category
// @access Public, Private
router
  .route("/category")
  .get(categoryCtrl.getCategory)
  .post(auth, categoryCtrl.createCategory);

export default router;
