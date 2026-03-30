import { Dispatch } from "redux";
import { AUTH, IAuth, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { patchAPI } from "../../utils/FetchData";
import { checkPassword } from "../../utils/Validate";

export const updateUser =
  (
    image: Blob,
    name: string,
    usta: string | undefined,
    bbook: string | undefined,
    auth: IAuth
  ) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      let imageUrl = auth.user.image;

      if (image) {
        const check = checkImage(image);
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });
        const photo = await imageUpload(image);
        imageUrl = photo.url;
      }

      const updated = {
        image: imageUrl,
        name: name || auth.user.name,
        usta: usta || auth.user.usta,
        bbook: bbook || auth.user.bbook,
      };

      dispatch({
        type: AUTH,
        payload: { access_token: auth.access_token, user: { ...auth.user, ...updated } },
      });

      await patchAPI("user", updated);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Update failed" } });
    }
  };

export const resetPassword =
  (password: string, cf_password: string) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    const msg = checkPassword(password, cf_password);
    if (msg) return dispatch({ type: ALERT, payload: { errors: msg } });

    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI("reset_password", { password });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg ?? "Password reset failed" } });
    }
  };