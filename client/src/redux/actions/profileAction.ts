import { Dispatch } from "redux";
import { AUTH, IAuth, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { patchAPI } from "../../utils/FetchData";
import { checkPassword } from "../../utils/Validate";

export const updateUser =
  (image: Blob, name: string, usta: string, bbook: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;
    let url = "";

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (image) {
        const check = checkImage(image);
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });

        const photo = await imageUpload(image);
        url = photo.url;
      }

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            image: url ? url : auth.user.image,
            name: name ? name : auth.user.name,
            usta: usta ? usta : auth.user.usta,
            bbook: bbook ? bbook : auth.user.bbook,
          },
        },
      });

      const res = await patchAPI(
        "user",
        {
          image: url ? url : auth.user.image,
          name: name ? name : auth.user.name,
          usta: usta ? usta : auth.user.usta,
          bbook: bbook ? bbook : auth.user.bbook,
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
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    const msg = checkPassword(password, cf_password);
    if (msg) return dispatch({ type: ALERT, payload: { errors: msg } });

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await patchAPI("reset_password", { password }, access_token);

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
