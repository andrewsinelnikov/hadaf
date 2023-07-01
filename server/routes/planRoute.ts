import express from "express";
import planCtrl from "../controllers/planCtrl";
import auth from "../middleware/auth";

const router = express.Router();

// @route  POST api/plan/:goal
// @desc   Create a plan item
// @access Private
router.route("/plan").post(auth, planCtrl.createPlanItem);

// @route  GET api/goals
// @desc   Get all goals
// @access Private
// router.route("/goals").get(auth, goalCtrl.getGoals);

// @route  GET api/current
// @desc   Get current goals
// @access Private
// router.route("/current").get(auth, goalCtrl.getCurrentGoals);

// @route  PATCH, DELETE api/goal/:id
// @desc   Update, Delete goal
// @access Private
// router
//   .route("/goal/:id")
//   .patch(auth, goalCtrl.updateGoal)
//   .delete(auth, goalCtrl.deleteGoal);

export default router;
