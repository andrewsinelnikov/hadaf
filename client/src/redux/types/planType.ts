import { IItem } from "../../utils/TypeScript";

export const CREATE_PLAN_ITEM = "CREATE_PLAN_ITEM";
export const GET_GOALS = "GET_GOALS";
export const GET_CURRENT_GOALS = "GET_CURRENT_GOALS";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const DELETE_GOAL = "DELETE_GOAL";

export interface ICreatePlanItem {
  type: typeof CREATE_PLAN_ITEM;
  payload: IItem;
}

export interface IGetGoals {
  type: typeof GET_GOALS;
  payload: IItem[];
}

export interface IGetCurrentGoals {
  type: typeof GET_CURRENT_GOALS;
  payload: IItem[];
}

export interface IUpdateGoal {
  type: typeof UPDATE_GOAL;
  payload: IItem;
}

export interface IDeleteGoal {
  type: typeof DELETE_GOAL;
  payload: string;
}

export type IPlanType = ICreatePlanItem;
