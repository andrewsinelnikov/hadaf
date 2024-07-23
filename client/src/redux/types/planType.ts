import { IItem } from "../../utils/TypeScript";

export const CREATE_PLAN_ITEM = "CREATE_PLAN_ITEM";
export const GET_CURRENT_PLANS = "GET_CURRENT_PLANS";
export const GET_PLANS_BY_GOAL = "GET_PLANS_BY_GOAL";
export const GET_PLAN_BY_ID = "GET_PLAN_BY_ID";
export const UPDATE_PLAN_ITEM = "UPDATE_PLAN_ITEM";
export const DELETE_PLAN_ITEM = "DELETE_PLAN_ITEM";

export interface ICreatePlanItem {
  type: typeof CREATE_PLAN_ITEM;
  payload: IItem;
}

export interface IGetPlanById {
  type: typeof GET_PLAN_BY_ID;
  // payload: IItem[];
  payload: IItem;
}

export interface IUpdatePlanItem {
  type: typeof UPDATE_PLAN_ITEM;
  payload: IItem;
}

export interface IDeletePlanItem {
  type: typeof DELETE_PLAN_ITEM;
  payload: string;
}

export interface IGetCurrentPlans {
  type: typeof GET_CURRENT_PLANS;
  payload: IItem[];
}

export interface IPlansGoal {
  goal: string;
  plans: IItem[];
}

export interface IGetPlansByGoal {
  type: typeof GET_PLANS_BY_GOAL;
  payload: IPlansGoal;
}

export type IPlanType =
  | ICreatePlanItem
  | IGetCurrentPlans
  | IGetPlanById
  | IUpdatePlanItem
  | IDeletePlanItem;
