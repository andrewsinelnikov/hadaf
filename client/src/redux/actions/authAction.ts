import { Dispatch } from "redux";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { IUserLogin, IUserRegister } from "../../types";
import { postAPI, getAPI } from "../../utils/FetchData";
import { validateRegister, validatePhone } from "../../utils/Validate";

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("login", userLogin);
      dispatch({ type: AUTH, payload: res.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      localStorage.setItem("logged", "hadaf");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Login failed" } });
    }
  };

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validateRegister(userRegister);
    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("register", userRegister);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Registration failed" } });
    }
  };

export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem("logged");
    if (logged !== "hadaf") return;

    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("refresh_token");
      dispatch({ type: AUTH, payload: res.data });
      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      // Refresh failed on app load — clear silently, don't show error
      localStorage.removeItem("logged");
      dispatch({ type: AUTH, payload: {} });
      dispatch({ type: ALERT, payload: {} });
    }
  };

export const logout =
  () =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      await getAPI("logout");
    } catch {
      // Even if the server call fails, clear the session locally
    } finally {
      localStorage.removeItem("logged");
      dispatch({ type: AUTH, payload: {} });
    }
  };

export const googleLogin =
  (id_token: string) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("google_login", { id_token });
      dispatch({ type: AUTH, payload: res.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      localStorage.setItem("logged", "hadaf");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Google login failed" } });
    }
  };

export const loginSMS =
  (phone: string) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const valid = validatePhone(phone);
    if (!valid)
      return dispatch({
        type: ALERT,
        payload: { errors: "Phone number format is incorrect (+country code required)" },
      });

    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      await postAPI("login_sms", { phone });
      // Signal to LoginSMS component that code was sent
      dispatch({ type: ALERT, payload: { success: "Code sent to your phone" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Failed to send code" } });
    }
  };

export const verifySMS =
  (phone: string, code: string) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("sms_verify", { phone, code });
      dispatch({ type: AUTH, payload: res.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      localStorage.setItem("logged", "hadaf");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Invalid code" } });
    }
  };