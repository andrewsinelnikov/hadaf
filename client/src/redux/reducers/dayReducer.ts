import { IDay } from "../../types";
import { IDayType, CREATE_DAY, GET_DAY } from "../types/dayType";

const dayReducer = (state: IDay = {}, action: IDayType): IDay => {
  // const dayReducer = (state: IDay[] = [], action: IDayType): IDay[] => {
  switch (action.type) {
    case CREATE_DAY:
    // return [action.payload, ...state];
    // return action.payload;
    case GET_DAY:
      return action.payload;
    default:
      return state;
  }
};

export default dayReducer;
