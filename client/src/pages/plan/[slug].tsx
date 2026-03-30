import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { IParams } from "../../types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { ALERT } from "../../redux/types/alertType";
import { createPlanItem, getPlansByGoal } from "../../redux/actions/planAction";

import UserLayout from "../../components/layouts/UserLayout";
import UserInfo from "../../components/profile/UserInfo";
import TimeReminder from "../../components/workboard/TimeReminder";
import { IItem } from "../../types";
import ItemList from "../../components/workboard/ItemList";
import Footer from "../../components/global/Footer";
import ItemInput from "../../components/workboard/ItemInput";
import { validateItem } from "../../utils/Validate";
import { updateGoal } from "../../redux/actions/goalAction";

const PlanForGoal = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;
  const { auth, goals, plansGoal } = useAppSelector(
    (state: RootState) => state
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [activeGoal, setActiveGoal] = useState<IItem>();

  const inialState = {
    goal: slug,
    text: "",
    count: 1,
    completeness: 0,
    createdAt: new Date().toISOString(),
  };

  const [planItem, setPlanItem] = useState<IItem>(inialState);
  const [plan, setPlan] = useState<Array<IItem>>([]);

  const [days, setDays] = useState<number>(0);

  useEffect(() => {
    const goal = goals.find((item) => item._id === slug);
    if (goal) setActiveGoal(goal);
  }, [slug, goals]);

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
    if (!activeGoal) return;
    if (plansGoal.every((item) => item.goal !== activeGoal._id)) {
      dispatch(getPlansByGoal(activeGoal._id!));
    } else {
      const data = plansGoal.find((item) => item.goal === activeGoal._id);
      if (!data) return;
      setPlan(data.plans);
    }
  }, [auth.access_token, navigate, activeGoal, dispatch, plansGoal]);

  const addPlanItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.access_token) return;

    const check = validateItem(planItem, "Please type a step toward the goal");
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    dispatch(createPlanItem(planItem));
    dispatch(updateGoal(planItem, true));
    dispatch(getPlansByGoal(activeGoal?._id!));
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <div className='content'>
            <TimeReminder action='goals' type='season' setDays={setDays} />
            <div className='goal-plan'>
              <ItemList
                items={plan}
                setItems={setPlan}
                action='plans'
                goal={activeGoal?.text}
              />
            </div>
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