import { IDay } from "../../utils/TypeScript";

export const CREATE_DAY = "CREATE_DAY";
export const GET_DAY = "GET_DAY";
export const GET_CURRENT_GOALS = "GET_CURRENT_GOALS";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const DELETE_GOAL = "DELETE_GOAL";

export interface ICreateDay {
  type: typeof CREATE_DAY;
  payload: IDay;
}

export interface IGetDay {
  type: typeof GET_DAY;
  payload: IDay;
}

// export interface IGetCurrentGoals {
//   type: typeof GET_CURRENT_GOALS;
//   payload: IItem[];
// }

// export interface IUpdateGoal {
//   type: typeof UPDATE_GOAL;
//   payload: IItem;
// }

export type IDayType = ICreateDay | IGetDay;
