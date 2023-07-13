import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_GOAL,
  GET_CURRENT_GOALS,
  GET_GOALS,
  UPDATE_GOAL,
  DELETE_GOAL,
  IGoalType,
} from "../types/goalType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { IItem } from "../../utils/TypeScript";

import { checkTokenExp } from "../../utils/checkTokenExp";

export const createGoal =
  (goal: IItem, token: string) =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("goal", goal, access_token);

      dispatch({ type: CREATE_GOAL, payload: res.data.newGoal });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getGoals =
  (token: string) => async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI("goals", access_token);
      dispatch({ type: GET_GOALS, payload: res.data.goals });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getCurrentGoals =
  (token: string) => async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI("current", access_token);
      dispatch({ type: GET_CURRENT_GOALS, payload: res.data.goals });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateGoal =
  (data: IItem, token: string, plan?: boolean) =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: UPDATE_GOAL, payload: data });

      if (!plan) {
        await patchAPI(`goal/${data._id}`, { text: data.text }, access_token);
      } else {
        await patchAPI(
          `goal/${data.goal}`,
          { count: data.count },
          access_token
        );
      }
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteGoal =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: DELETE_GOAL, payload: id });

      await deleteAPI(`goal/${id}`, access_token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
