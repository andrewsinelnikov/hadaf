import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import Loading from "./Loading";
import Toast from "./Toast";

export const Alert = () => {
  const { alert } = useSelector((state: RootState) => state);

  return (
    <>
      {alert.loading && <Loading />}
      {alert.errors && <Toast type="error" body={alert.errors} />}
      {alert.success && <Toast type="success" body={alert.success} />}
    </>
  );
};

export const showErrMsg = (msg: string) => (
  <p className="inline-msg inline-msg--error">{msg}</p>
);

export const showSuccessMsg = (msg: string) => (
  <p className="inline-msg inline-msg--success">{msg}</p>
);