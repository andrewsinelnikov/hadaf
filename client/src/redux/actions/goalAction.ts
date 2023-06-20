import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_GOAL,
  GET_GOALS,
  IGoalType,
  UPDATE_GOAL,
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

export const updateGoal =
  (data: IItem, token: string) =>
  async (dispatch: Dispatch<IAlertType | IGoalType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: UPDATE_GOAL, payload: data });

      await patchAPI(`category/${data._id}`, { name: data.name }, access_token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

// export const deleteCategory =
//   (id: string, token: string) =>
//   async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
//     const result = await checkTokenExp(token, dispatch);
//     const access_token = result ? result : token;
//     try {
//       dispatch({ type: DELETE_CATEGORY, payload: id });

//       await deleteAPI(`category/${id}`, access_token);
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
//     }
//   };
