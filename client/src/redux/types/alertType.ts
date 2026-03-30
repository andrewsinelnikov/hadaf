import { IAlert } from "../../types";

export const ALERT = "ALERT";

export interface IAlertType {
  type: typeof ALERT;
  payload: IAlert;
}
