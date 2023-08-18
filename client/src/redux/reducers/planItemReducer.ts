import { IPlanType, GET_PLAN_BY_ID } from "../types/planType";
import { IItem } from "../../utils/TypeScript";

const planItemReducer = (state: IItem, action: IPlanType) => {
  switch (action.type) {
    case GET_PLAN_BY_ID:
      return action.payload;
      // case UPDATE_PLAN_ITEM:
      //   return state.map((item) =>
      //     item._id === action.payload._id
      //       ? { ...item, text: action.payload.text }
      //       : item
      //   );
      // case DELETE_PLAN_ITEM:
      //   return state.filter((item) => item._id !== action.payload);
      // default:
      return state;
  }
};

export default planItemReducer;
