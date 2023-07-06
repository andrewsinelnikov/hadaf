import { IItem } from "../../utils/TypeScript";

export const CREATE_PLAN_ITEM = "CREATE_PLAN_ITEM";
export const GET_PLANS_BY_GOAL = "GET_PLANS_BY_GOAL";
export const UPDATE_PLAN_ITEM = "UPDATE_PLAN_ITEM";
export const DELETE_PLAN_ITEM = "DELETE_PLAN_ITEM";

export interface ICreatePlanItem {
  type: typeof CREATE_PLAN_ITEM;
  payload: IItem;
}

export interface IPlansGoal {
  goal: string;
  plans: IItem[];
}

export interface IGetPlansByGoal {
  type: typeof GET_PLANS_BY_GOAL;
  payload: IPlansGoal;
}

export interface IUpdatePlanItem {
  type: typeof UPDATE_PLAN_ITEM;
  payload: IItem;
}

export interface IDeletePlanItem {
  type: typeof DELETE_PLAN_ITEM;
  payload: string;
}

export type IPlanType = ICreatePlanItem | IUpdatePlanItem | IDeletePlanItem;
