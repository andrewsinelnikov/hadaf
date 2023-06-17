import {
  CREATE_GOAL,
  GET_GOALS,
  ICreateGoal,
  IGetGoals,
  IGoalType,
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
  action: IGetGoals
  // state: ICategory[] = [],
  // action: ICategoryType
): IItem[] => {
  switch (action.type) {
    case GET_GOALS:
      return action.payload;
    // case GET_CATEGORIES:
    //   return action.payload;
    // case UPDATE_CATEGORY:
    //   return state.map((item) =>
    //     item._id === action.payload._id
    //       ? { ...item, name: action.payload.name }
    //       : item
    //   );
    // case DELETE_CATEGORY:
    //   return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default goalReducer;
