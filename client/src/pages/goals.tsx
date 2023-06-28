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
import { validateItem } from "../utils/Validate";
import { ALERT } from "../redux/types/alertType";
import { getSeason } from "../utils/getSeason";

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

  const [goal, setGoal] = useState<IItem>(inialState);
  const [myGoals, setMyGoals] = useState<Array<IItem>>([]);

  const navigate = useNavigate();

  const date = new Date();
  let season = getSeason(date);

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.access_token) return;

    const check = validateItem(goal, "Please type your goal");
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    dispatch(createGoal(goal, auth.access_token));
    setMyGoals([...myGoals, goal]);
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <div className='content'>
            <TimeReminder action='goals' />
            <ItemList
              items={goals}
              setItems={setMyGoals}
              type='goals'
              season={season}
            />
          </div>
          <Footer />
        </div>
        {goals.length < 3 && (
          <ItemInput
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
