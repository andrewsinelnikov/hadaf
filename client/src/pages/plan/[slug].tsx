import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { IParams } from "../../utils/TypeScript";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import UserLayout from "../../components/layouts/UserLayout";
import UserInfo from "../../components/profile/UserInfo";
import TimeReminder from "../../components/workboard/TimeReminder";
import { IItem } from "../../utils/TypeScript";
import ItemList from "../../components/workboard/ItemList";
import Footer from "../../components/global/Footer";
import ItemInput from "../../components/workboard/ItemInput";
import { validateItem } from "../../utils/Validate";
import { ALERT } from "../../redux/types/alertType";

const PlanForGoal = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;
  const { auth, goals } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [activeGoal, setActiveGoal] = useState<IItem>();

  const inialState = {
    user: "",
    text: "",
    completeness: 1,
    isDone: false,
    createdAt: new Date().toISOString(),
  };

  const [planItem, setPlanItem] = useState<IItem>(inialState);
  const [plan, setPlan] = useState<Array<IItem>>([]);

  const [days, setDays] = useState<number>(0);

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
    setActiveGoal(goals.find((item) => item._id === slug));
  }, [auth.access_token, navigate, goals, slug]);

  const addPlanItem = (e: React.FormEvent) => {
    e.preventDefault();

    const check = validateItem(planItem, "Please type a step toward the goal");
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    if (planItem) {
      setPlan([...plan, planItem]);
    }
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <div className='content'>
            <TimeReminder action='plans' type='season' setDays={setDays} />
            <ItemList
              items={plan}
              setItems={setPlan}
              type='plans'
              goal={activeGoal?.text}
            />
          </div>
          <Footer />
        </div>
        <ItemInput
          item={planItem}
          setItem={setPlanItem}
          itemType='Step'
          items={plan}
          handleAdd={addPlanItem}
          days={days}
        />
      </div>
    </UserLayout>
  );
};

export default PlanForGoal;
