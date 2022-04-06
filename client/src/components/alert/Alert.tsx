import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";

import Loading from "./Loading";

const Alert = () => {
  const { alert } = useSelector((state: RootStore) => state);
  return <>{alert.loading && <Loading />}</>;
};

export default Alert;
