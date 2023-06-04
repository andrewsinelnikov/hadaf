import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
import UserPosts from "../components/profile/UserPosts";
import AddItem from "../components/workboard/AddItem";

const Actions = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  const [item, setItem] = useState<string>("");

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          {/* <UserPosts /> */}
          <TimeReminder action='actions' />
        </div>
        <AddItem item={item} setItem={setItem} itemType='Task' />
      </div>
    </UserLayout>
  );
};

export default Actions;
