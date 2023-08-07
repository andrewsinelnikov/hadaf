import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { IDayType, CREATE_DAY } from "../types/dayType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { IItem } from "../../utils/TypeScript";

import { checkTokenExp } from "../../utils/checkTokenExp";

export const createDay =
  (date: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDayType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("day", { date }, access_token);

      dispatch({ type: CREATE_DAY, payload: res.data.newDay });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

// export const getCurrentPlans =
//   (token: string) => async (dispatch: Dispatch<IAlertType | IPlanType>) => {
//     const result = await checkTokenExp(token, dispatch);
//     const access_token = result ? result : token;
//     try {
//       dispatch({ type: ALERT, payload: { loading: true } });

//       const res = await getAPI("current_plans", access_token);
//       dispatch({ type: GET_CURRENT_PLANS, payload: res.data.plans });

//       dispatch({ type: ALERT, payload: { loading: false } });
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
//     }
//   };

// export const getPlansByGoal =
//   (goal: string, token: string) =>
//   async (dispatch: Dispatch<IAlertType | IGetPlansByGoal>) => {
//     const result = await checkTokenExp(token, dispatch);
//     const access_token = result ? result : token;
//     try {
//       dispatch({ type: ALERT, payload: { loading: true } });

//       const res = await getAPI(`plans/${goal}`, access_token);
//       dispatch({ type: GET_PLANS_BY_GOAL, payload: { ...res.data, goal } });

//       dispatch({ type: ALERT, payload: { loading: false } });
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
//     }
//   };

// export const updatePlanItem =
//   (data: IItem, token: string) =>
//   async (dispatch: Dispatch<IAlertType | IPlanType>) => {
//     const result = await checkTokenExp(token, dispatch);
//     const access_token = result ? result : token;
//     try {
//       dispatch({ type: UPDATE_PLAN_ITEM, payload: data });

//       await patchAPI(`plan/${data._id}`, { text: data.text }, access_token);
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
//     }
//   };

// export const deletePlanItem =
//   (id: string, token: string) =>
//   async (dispatch: Dispatch<IAlertType | IPlanType>) => {
//     const result = await checkTokenExp(token, dispatch);
//     const access_token = result ? result : token;
//     try {
//       dispatch({ type: DELETE_PLAN_ITEM, payload: id });

//       await deleteAPI(`plan/${id}`, access_token);
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
//     }
//   };
