import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";

import Loading from "./Loading";
import Toast from "./Toast";

export const Alert = () => {
  const { alert } = useSelector((state: RootStore) => state);

  return (
    <>
      {alert.loading && <Loading />}
      {alert.errors && (
        <Toast title='Errors' body={alert.errors} bgColor='#dc3545' />
      )}
      <Toast
        title='Errors'
        body='oh'
        bgColor='linear-gradient(90deg, rgba(47, 15, 15, 0.9) 0%, rgba(10, 39, 73, 0.9) 45%, rgba(15, 31, 47, 0.9) 100%)'
      />
      {alert.success && (
        <Toast title='Success' body={alert.success} bgColor='#198754' />
      )}
      {/* <Toast title='Success' body='ok' bgColor='#198754' /> */}
    </>
  );
};

export const showErrMsg = (msg: string) => {
  return <div className='errMsg'>{msg}</div>;
};

export const showSuccessMsg = (msg: string) => {
  return <div className='successMsg'>{msg}</div>;
};
