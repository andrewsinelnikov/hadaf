import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
import AddItem from "../components/workboard/AddItem";

const Goals = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const [item, setItem] = useState<string>("");

  return (
    <div>
      <h2>Goals</h2>
    </div>
  );
};

export default Goals;
