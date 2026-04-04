import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_GOAL, GET_CURRENT_GOALS, GET_GOALS,
  UPDATE_GOAL, DELETE_GOAL, IGoalType,
} from "../types/goalType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { IItem } from "../../types";

export const createGoal =
  (goal: IItem) =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("goal", goal);
      dispatch({ type: CREATE_GOAL, payload: res.data.newGoal });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to create goal" } });
    }
  };

export const getGoals =
  () =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("goals");
      dispatch({ type: GET_GOALS, payload: res.data.goals });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to load goals" } });
    }
  };

export const getCurrentGoals =
  () =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("current");
      dispatch({ type: GET_CURRENT_GOALS, payload: res.data.goals });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to load goals" } });
    }
  };

export const updateGoal =
  (data: IItem, plan?: boolean) =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    try {
      dispatch({ type: UPDATE_GOAL, payload: data });
      if (!plan) {
        await patchAPI(`goal/${data._id}`, {
          text: data.text,
          isDone: data.isDone,
        });
      } else {
        await patchAPI(`goal/${data.goal}`, { count: data.count });
      }
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to update goal" } });
    }
  };

export const deleteGoal =
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    try {
      dispatch({ type: DELETE_GOAL, payload: id });
      await deleteAPI(`goal/${id}`);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to delete goal" } });
    }
  };