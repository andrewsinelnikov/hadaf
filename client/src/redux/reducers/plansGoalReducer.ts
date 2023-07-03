import {
  IPlansGoal,
  IGetPlansByGoal,
  GET_PLANS_BY_GOAL,
} from "../types/planType";

const plansGoalReducer = (
  state: IPlansGoal[] = [],
  action: IGetPlansByGoal
): IPlansGoal[] => {
  switch (action.type) {
    case GET_PLANS_BY_GOAL:
      if (state.every((item) => item.goal !== action.payload.goal)) {
        return [...state, action.payload];
      } else {
        return state.map((plan) =>
          plan.goal === action.payload.goal ? action.payload : plan
        );
      }
    default:
      return state;
  }
};

export default plansGoalReducer;
