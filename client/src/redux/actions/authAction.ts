import { Dispatch } from "redux";
import { AUTH, IAuthType } from "./../types/authType";

import { IUserLogin } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";

export const login =
  (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType>) => {
    try {
      //   dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("login", userLogin);

      dispatch({ type: AUTH, payload: res.data });

      //   dispatch({ type: ALERT, payload: { success: res.data.msg } });
      localStorage.setItem("logged", "true");
    } catch (err: any) {
      //   dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
      console.log(err.response.data.msg);
    }
  };
