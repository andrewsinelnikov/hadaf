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
import Footer from "../components/global/Footer";

const Goals = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  let date = new Date();
  let season = "";
  switch (date.getMonth()) {
    case 0:
    case 1:
    case 12:
      season = "Winter";
      break;
    case 2:
    case 3:
    case 4:
      season = "Spring";
      break;
    case 5:
    case 6:
    case 7:
      season = "Summer";
      break;
    case 8:
    case 9:
    case 10:
      season = "Autumn";
      break;
  }

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
          <ItemList items={goals} setItems={setGoals} season={season} />
          {goals.length > 3 && <Footer />}
        </div>
        {goals.length < 3 && (
          <AddItem
            item={goal}
            setItem={setGoal}
            itemType='Goal'
            items={goals}
            handleAdd={addGoal}
          />
        )}
      </div>
    </UserLayout>
  );
};

export default Goals;
