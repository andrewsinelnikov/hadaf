import { IItem } from "../../utils/TypeScript";

export const CREATE_GOAL = "CREATE_GOAL";
export const GET_GOALS = "GET_GOALS";
export const UPDATE_GOAL = "UPDATE_GOAL";
// export const DELETE_CATEGORY = "DELETE_CATEGORY";

export interface ICreateGoal {
  type: typeof CREATE_GOAL;
  payload: IItem;
}

export interface IGetGoals {
  type: typeof GET_GOALS;
  payload: IItem[];
}

export interface IUpdateGoal {
  type: typeof UPDATE_GOAL;
  payload: IItem;
}

// export interface IDeleteCategory {
//   type: typeof DELETE_CATEGORY;
//   payload: string;
// }

export type IGoalType = ICreateGoal | IGetGoals;
// | IUpdateCategory
// | IDeleteCategory;
