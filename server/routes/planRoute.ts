import express from "express";
import planCtrl from "../controllers/planCtrl";
import auth from "../middleware/auth";

const router = express.Router();

// @route  POST api/plan
// @desc   Create a plan item
// @access Private
router.route("/plan").post(auth, planCtrl.createPlanItem);

// @route  GET api/plans/:goal
// @desc   Get plans by goal
// @access Private
router.route("/plans/:goal").get(auth, planCtrl.getPlansByGoal);

// @route  PATCH, DELETE api/plan/:id
// @desc   Update, Delete plan item
// @access Private
router.route("/plan/:id").patch(auth, planCtrl.updatePlanItem);
//   .delete(auth, goalCtrl.deleteGoal);

export default router;
