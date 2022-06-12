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

// @route  PATCH, DELETE api/category/:id
// @desc   Update, Delete category
// @access Private
router.route("/category/:id").patch(auth, categoryCtrl.updateCategory);

export default router;
