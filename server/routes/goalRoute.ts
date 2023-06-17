import express from "express";
import goalCtrl from "../controllers/goalCtrl";
import auth from "../middleware/auth";

const router = express.Router();

// @route  POST api/goal
// @desc   Create goal
// @access Private
router.route("/goal").post(auth, goalCtrl.createGoal);

// @route  GET api/goal
// @desc   Get goals
// @access Private
// router.route("/goals").get(goalCtrl.getGoals);
router.route("/goals").get(auth, goalCtrl.getGoals);

// @route  PATCH, DELETE api/category/:id
// @desc   Update, Delete category
// @access Private
// router
//   .route("/category/:id")
//   .patch(auth, categoryCtrl.updateCategory)
//   .delete(auth, categoryCtrl.deleteCategory);

export default router;
