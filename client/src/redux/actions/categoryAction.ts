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
import { ICategory } from "../../types";

export const createCategory =
  (name: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("category", { name });
      dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to create category" } });
    }
  };

export const getCategories =
  () =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("category");
      dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to load categories" } });
    }
  };

export const updateCategory =
  (data: ICategory) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: UPDATE_CATEGORY, payload: data });
      await patchAPI(`category/${data._id}`, { name: data.name });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to update category" } });
    }
  };

export const deleteCategory =
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: DELETE_CATEGORY, payload: id });
      await deleteAPI(`category/${id}`);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to delete category" } });
    }
  };