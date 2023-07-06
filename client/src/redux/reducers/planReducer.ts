import {
  IPlanType,
  CREATE_PLAN_ITEM,
  UPDATE_PLAN_ITEM,
  DELETE_PLAN_ITEM,
} from "../types/planType";
import { IItem } from "../../utils/TypeScript";

const planReducer = (state: IItem[] = [], action: IPlanType): IItem[] => {
  switch (action.type) {
    case CREATE_PLAN_ITEM:
      return [action.payload, ...state];
    case UPDATE_PLAN_ITEM:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, text: action.payload.text }
          : item
      );
    case DELETE_PLAN_ITEM:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default planReducer;
