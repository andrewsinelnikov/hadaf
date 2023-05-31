import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";

const Actions = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  return (
    <div>
      <h2>Actions</h2>
    </div>
  );
};

export default Actions;
