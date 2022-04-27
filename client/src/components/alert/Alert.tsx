import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";

import Loading from "./Loading";
import Toast from "./Toast";

export const Alert = () => {
  const { alert } = useSelector((state: RootStore) => state);

  return (
    <>
      {/* {alert.loading && <Loading />} */}
      <Loading />
      {alert.errors && (
        <Toast title='Errors' body={alert.errors} bgColor='#dc3545' />
      )}
      {alert.success && (
        <Toast title='Success' body={alert.success} bgColor='#198754' />
      )}
    </>
  );
};

export const showErrMsg = (msg: string) => {
  return <div className='errMsg'>{msg}</div>;
};

export const showSuccessMsg = (msg: string) => {
  return <div className='successMsg'>{msg}</div>;
};
