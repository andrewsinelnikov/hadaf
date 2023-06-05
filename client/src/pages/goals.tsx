import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
import AddItem from "../components/workboard/AddItem";
import { IItem } from "../utils/TypeScript";

const Goals = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const [goal, setGoal] = useState<string>("");
  const [goals, setGoals] = useState<Array<IItem>>([]);

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();

    if (goal) {
      setGoals([...goals, { _id: Date.now(), item: goal, isDone: false }]);
      setGoal("");
    }
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <TimeReminder action='goals' />
        </div>
        <AddItem
          item={goal}
          setItem={setGoal}
          itemType='Goal'
          handleAdd={addGoal}
        />
      </div>
    </UserLayout>
  );
};

export default Goals;
