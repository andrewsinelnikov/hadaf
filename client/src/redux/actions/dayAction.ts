import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { IDayType, CREATE_DAY, GET_DAY } from "../types/dayType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { IDay, IItem } from "../../utils/TypeScript";

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

export const getDay =
  (date: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDayType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI(`day/${date}`, access_token);
      dispatch({ type: GET_DAY, payload: res.data.day });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

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
