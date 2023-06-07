import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
import AddItem from "../components/workboard/AddItem";
import { IItem } from "../utils/TypeScript";

const Plans = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const [planItem, setPlanItem] = useState<string>("");
  const [plan, setPlan] = useState<Array<IItem>>([]);

  const addPlanItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (planItem) {
      setPlan([...plan, { _id: Date.now(), item: planItem, isDone: false }]);
      setPlanItem("");
    }
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          {/* <UserPosts /> */}
          <TimeReminder action='plans' />
        </div>
        <AddItem
          item={planItem}
          setItem={setPlanItem}
          itemType='Plan Item'
          items={plan}
          handleAdd={addPlanItem}
        />
      </div>
    </UserLayout>
  );
};

export default Plans;
