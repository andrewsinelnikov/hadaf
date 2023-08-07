import { IDayType, CREATE_DAY } from "../types/dayType";
import { IDay } from "../../utils/TypeScript";

const dayReducer = (state: IDay[] = [], action: IDayType): IDay[] => {
  switch (action.type) {
    case CREATE_DAY:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default dayReducer;
