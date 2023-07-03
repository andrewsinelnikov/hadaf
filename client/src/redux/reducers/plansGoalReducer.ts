import {
  IPlansGoal,
  IGetPlansByGoal,
  GET_PLANS_BY_GOAL,
  // GET_PLANS_BY_GOAL,
} from "../types/planType";
import { IItem } from "../../utils/TypeScript";

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
    // case GET_PLANS_BY_GOAL:
    //   return action.payload;
    // case UPDATE_GOAL:
    //   return state.map((item) =>
    //     item._id === action.payload._id
    //       ? { ...item, text: action.payload.text }
    //       : item
    //   );
    // case DELETE_GOAL:
    //   return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default plansGoalReducer;
