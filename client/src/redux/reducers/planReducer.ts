import {
  IPlanType,
  CREATE_PLAN_ITEM,
  // GET_PLANS_BY_GOAL,
} from "../types/planType";
import { IItem } from "../../utils/TypeScript";

const planReducer = (state: IItem[] = [], action: IPlanType): IItem[] => {
  switch (action.type) {
    case CREATE_PLAN_ITEM:
      return [action.payload, ...state];
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

export default planReducer;
