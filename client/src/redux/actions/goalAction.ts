import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { GET_GOALS, IGetGoals } from "../types/goalType";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  ICategoryType,
  UPDATE_CATEGORY,
} from "../types/categoryType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { ICategory, IItem } from "../../utils/TypeScript";

import { checkTokenExp } from "../../utils/checkTokenExp";

export const createGoal =
  (goal: IItem, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    // const result = await checkTokenExp(token, dispatch);
    // const access_token = result ? result : token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("goal", goal, token);
      // const res = await postAPI("goal", goal, access_token);

      // dispatch({ type: CREATE_GOAL, payload: res.data.newGoal });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getGoals =
  () => async (dispatch: Dispatch<IAlertType | IGetGoals>) => {
    // const result = await checkTokenExp(token, dispatch);
    // const access_token = result ? result : token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI("goals");
      dispatch({ type: GET_GOALS, payload: res.data });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

// export const getCategories =
//   () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
//     try {
//       dispatch({ type: ALERT, payload: { loading: true } });

//       const res = await getAPI("category");

//       dispatch({ type: GET_CATEGORIES, payload: res.data.categories });

//       dispatch({ type: ALERT, payload: { loading: false } });
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
//     }
//   };

// export const updateCategory =
//   (data: ICategory, token: string) =>
//   async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
//     const result = await checkTokenExp(token, dispatch);
//     const access_token = result ? result : token;
//     try {
//       dispatch({ type: UPDATE_CATEGORY, payload: data });

//       await patchAPI(`category/${data._id}`, { name: data.name }, access_token);
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
//     }
//   };

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
