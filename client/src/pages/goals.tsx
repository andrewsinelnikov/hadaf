import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import { IItem } from "../utils/TypeScript";
import TimeReminder from "../components/workboard/TimeReminder";
import ItemList from "../components/workboard/ItemList";
import AddItem from "../components/workboard/AddItem";

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

  console.log(goals);

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <TimeReminder action='goals' />
          <ItemList items={goals} setItems={setGoals} />
        </div>
        <AddItem
          item={goal}
          setItem={setGoal}
          itemType='Goal'
          items={goals}
          handleAdd={addGoal}
        />
      </div>
    </UserLayout>
  );
};

export default Goals;
