import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import { IItem } from "../utils/TypeScript";
import TimeReminder from "../components/workboard/TimeReminder";
import ItemList from "../components/workboard/ItemList";
import ItemInput from "../components/workboard/ItemInput";
import Footer from "../components/global/Footer";
import { createGoal } from "../redux/actions/goalAction";

const Goals = () => {
  const { auth, goals } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");
  // const [goals, setGoals] = useState<Array<IItem>>([]);

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

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.access_token || !text) return;

    // setGoals([
    //   ...goals,
    //   { _id: Date.now(), text: goal, completeness: 5, isDone: false },
    // ]);
    dispatch(createGoal(text, auth.access_token));
    setText("");
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <div className='content'>
            <TimeReminder action='goals' />
            {/* <ItemList items={goals} setItems={setGoals} season={season} /> */}
          </div>
          <Footer />
        </div>
        {goals.length < 3 && (
          <ItemInput
            item={text}
            setItem={setText}
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
