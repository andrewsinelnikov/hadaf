import {
  IGoalType,
  CREATE_GOAL,
  GET_GOALS,
  GET_CURRENT_GOALS,
  UPDATE_GOAL,
  DELETE_GOAL,
} from "../types/goalType";
import { IItem } from "../../utils/TypeScript";

const goalReducer = (state: IItem[] = [], action: IGoalType): IItem[] => {
  switch (action.type) {
    case CREATE_GOAL:
      return [action.payload, ...state];
    case GET_GOALS:
    case GET_CURRENT_GOALS:
      return action.payload;
    case UPDATE_GOAL:
      return state.map((item) =>
        item._id === action.payload._id
          ? {
              ...item,
              // text: action.payload.text,
              comcompleteness: item.completeness! + action.payload.count!,
            }
          : item
      );
    case DELETE_GOAL:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default goalReducer;
