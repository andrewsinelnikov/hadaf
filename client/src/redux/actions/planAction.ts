import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import {
  IPlanType, IGetPlansByGoal,
  CREATE_PLAN_ITEM, GET_CURRENT_PLANS, GET_PLANS_BY_GOAL,
  UPDATE_PLAN_ITEM, DELETE_PLAN_ITEM, GET_PLAN_BY_ID,
} from "../types/planType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { IItem } from "../../types";

export const createPlanItem =
  (planItem: IItem) =>
  async (dispatch: Dispatch<IAlertType | IPlanType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("plan", planItem);
      dispatch({ type: CREATE_PLAN_ITEM, payload: res.data.newPlanItem });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to create plan item" } });
    }
  };

export const getCurrentPlans =
  () =>
  async (dispatch: Dispatch<IAlertType | IPlanType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("current_plans");
      dispatch({ type: GET_CURRENT_PLANS, payload: res.data.plans });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to load plans" } });
    }
  };

export const getPlansByGoal =
  (goal: string) =>
  async (dispatch: Dispatch<IAlertType | IGetPlansByGoal>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(`plans/${goal}`);
      dispatch({ type: GET_PLANS_BY_GOAL, payload: { ...res.data, goal } });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to load plans" } });
    }
  };

export const getPlanById =
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | IPlanType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(`plan/${id}`);
      dispatch({ type: GET_PLAN_BY_ID, payload: res.data.plan });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to load plan" } });
    }
  };

export const updatePlanItem =
  (data: IItem) =>
  async (dispatch: Dispatch<IAlertType | IPlanType>) => {
    try {
      dispatch({ type: UPDATE_PLAN_ITEM, payload: data });
      await patchAPI(`plan/${data._id}`, { text: data.text });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to update plan item" } });
    }
  };

export const deletePlanItem =
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | IPlanType>) => {
    try {
      dispatch({ type: DELETE_PLAN_ITEM, payload: id });
      await deleteAPI(`plan/${id}`);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to delete plan item" } });
    }
  };