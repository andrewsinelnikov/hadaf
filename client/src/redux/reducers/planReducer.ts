import {
  IPlanType,
  IGetPlansByGoal,
  CREATE_PLAN_ITEM,
  GET_CURRENT_PLANS,
  GET_PLANS_BY_GOAL,
  GET_PLAN_BY_ID,
  UPDATE_PLAN_ITEM,
  DELETE_PLAN_ITEM,
  IPlansGoal,
} from "../types/planType";
import { IItem } from "../../types";

// ── All plans for the current season (flat list) ──────────────────────────────
export const plansReducer = (
  state: IItem[] = [],
  action: IPlanType | IGetPlansByGoal
): IItem[] => {
  switch (action.type) {
    case CREATE_PLAN_ITEM:
      return [action.payload as IItem, ...state];
    case GET_CURRENT_PLANS:
      return action.payload as IItem[];
    case UPDATE_PLAN_ITEM:
      return state.map((item) =>
        item._id === (action.payload as IItem)._id
          ? { ...item, text: (action.payload as IItem).text }
          : item
      );
    case DELETE_PLAN_ITEM:
      return state.filter((item) => item._id !== (action.payload as string));
    default:
      return state;
  }
};

// ── Plans grouped by goal (for the plan detail view) ─────────────────────────
export const plansGoalReducer = (
  state: IPlansGoal[] = [],
  action: IGetPlansByGoal | IPlanType
): IPlansGoal[] => {
  switch (action.type) {
    case GET_PLANS_BY_GOAL: {
      const payload = action.payload as IPlansGoal;
      return state.every((item) => item.goal !== payload.goal)
        ? [...state, payload]
        : state.map((plan) => (plan.goal === payload.goal ? payload : plan));
    }
    default:
      return state;
  }
};

// ── Single plan item (for the plan builder page) ──────────────────────────────
export const planItemReducer = (
  state: IItem | null = null,
  action: IPlanType
): IItem | null => {
  switch (action.type) {
    case GET_PLAN_BY_ID:
      return action.payload as IItem;
    default:
      return state;
  }
};

// Default export for the main plans list (backward compat with store)
export default plansReducer;