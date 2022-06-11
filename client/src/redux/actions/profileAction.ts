import { Dispatch } from "redux";
import { AUTH, IAuth, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { patchAPI } from "../../utils/FetchData";

export const updateUser =
  (avatar: Blob, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;
    let url = "";

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (avatar) {
        const check = checkImage(avatar);
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });

        const photo = await imageUpload(avatar);
        url = photo.url;
      }

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        },
      });

      const res = await patchAPI(
        "user",
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        access_token
      );

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const resetPassword =
  (password: string, cf_password: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {};
