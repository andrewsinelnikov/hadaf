import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  ICategoryType,
  UPDATE_CATEGORY,
} from "../types/categoryType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { ICategory } from "../../utils/TypeScript";

import { checkTokenExp } from "./../../utils/checkTokenExp";

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("category", { name }, access_token);

      dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
