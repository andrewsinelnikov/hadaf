import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { createGoal } from "../redux/actions/goalAction";

import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import { IItem } from "../utils/TypeScript";
import TimeReminder from "../components/workboard/TimeReminder";
import ItemList from "../components/workboard/ItemList";
import ItemInput from "../components/workboard/ItemInput";
import Footer from "../components/global/Footer";
import { validateGoal } from "../utils/Validate";
import { ALERT } from "../redux/types/alertType";

const Goals = () => {
  const inialState = {
    user: "",
    text: "",
    completeness: 1,
    isDone: false,
    createdAt: new Date().toISOString(),
  };

  const { auth, goals } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  // const [text, setText] = useState<string>("");
  const [goal, setGoal] = useState<IItem>(inialState);
  const [myGoals, setMyGoals] = useState<Array<IItem>>([]);

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
    if (!auth.access_token) return;

    const check = validateGoal(goal);
    // const check = validateGoal({ ...goal, text: text });
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    // let newData = { ...goal, text: text };

    dispatch(createGoal(goal, auth.access_token));
    setMyGoals([...myGoals, goal]);
    // setText("");
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <div className='content'>
            <TimeReminder action='goals' />
            <ItemList items={goals} setItems={setMyGoals} season={season} />
          </div>
          <Footer />
        </div>
        {myGoals.length < 3 && (
          <ItemInput
            item={goal}
            setItem={setGoal}
            itemType='Goal'
            items={myGoals}
            handleAdd={addGoal}
          />
        )}
      </div>
    </UserLayout>
  );
};

export default Goals;
