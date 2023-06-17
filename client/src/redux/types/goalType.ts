import { IItem } from "../../utils/TypeScript";

export const CREATE_GOAL = "CREATE_GOAL";
export const GET_GOALS = "GET_GOALS";
// export const GET_CATEGORIES = "GET_CATEGORIES";
// export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
// export const DELETE_CATEGORY = "DELETE_CATEGORY";

export interface ICreateGoal {
  type: typeof CREATE_GOAL;
  payload: IItem;
}

export interface IGetGoals {
  type: typeof GET_GOALS;
  payload: IItem[];
}

// export interface IGetCategories {
//   type: typeof GET_CATEGORIES;
//   payload: ICategory[];
// }

// export interface IUpdateCategory {
//   type: typeof UPDATE_CATEGORY;
//   payload: ICategory;
// }

// export interface IDeleteCategory {
//   type: typeof DELETE_CATEGORY;
//   payload: string;
// }

export type IGoalType = ICreateGoal;
// | IGetCategories
// | IUpdateCategory
// | IDeleteCategory;
