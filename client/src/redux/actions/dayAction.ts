import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { IDayType, CREATE_DAY, GET_DAY } from "../types/dayType";
import { postAPI, getAPI } from "../../utils/FetchData";

export const createDay =
  (date: string) =>
  async (dispatch: Dispatch<IAlertType | IDayType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("day", { date });
      dispatch({ type: CREATE_DAY, payload: res.data.newDay });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to create day" } });
    }
  };

export const getDay =
  (date: string) =>
  async (dispatch: Dispatch<IAlertType | IDayType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(`day/${date}`);
      dispatch({ type: GET_DAY, payload: res.data.day });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to load day" } });
    }
  };