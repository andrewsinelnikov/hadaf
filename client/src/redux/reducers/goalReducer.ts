import {
  CREATE_GOAL,
  GET_GOALS,
  ICreateGoal,
  IGetGoals,
  IGoalType,
  UPDATE_GOAL,
} from "../types/goalType";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  ICategoryType,
  UPDATE_CATEGORY,
} from "../types/categoryType";
import { ICategory, IItem } from "../../utils/TypeScript";

const goalReducer = (
  state: IItem[] = [],
  action: IGoalType
  // state: ICategory[] = [],
  // action: ICategoryType
): IItem[] => {
  switch (action.type) {
    case CREATE_GOAL:
      return [action.payload, ...state];
    case GET_GOALS:
      return action.payload;
    case UPDATE_GOAL:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, text: action.payload.text }
          : item
      );
    // case DELETE_CATEGORY:
    //   return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default goalReducer;
