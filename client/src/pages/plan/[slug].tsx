import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { IParams } from "../../utils/TypeScript";
import { useAppSelector } from "../../utils/hooks";

import UserLayout from "../../components/layouts/UserLayout";
import UserInfo from "../../components/profile/UserInfo";
import TimeReminder from "../../components/workboard/TimeReminder";
import { IItem } from "../../utils/TypeScript";
import ItemList from "../../components/workboard/ItemList";
import Footer from "../../components/global/Footer";

const PlanForGoal = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;
  const { auth, goals } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  const [activeGoal, setActiveGoal] = useState<IItem>();

  const [planItem, setPlanItem] = useState<string>("");
  const [plan, setPlan] = useState<Array<IItem>>([]);

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
    setActiveGoal(goals.find((item) => item._id === slug));
  }, [auth.access_token, navigate]);

  const addPlanItem = (e: React.FormEvent) => {
    e.preventDefault();

    // if (planItem) {
    //   setPlan([...plan, { _id: Date.now(), text: planItem, isDone: false }]);
    //   setPlanItem("");
    // }
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <div className='content'>
            <TimeReminder action='plans' type='season' />
            <ItemList
              items={plan}
              setItems={setPlan}
              type='plans'
              goal={activeGoal?.text}
            />
            {/* <div className='item-goal'>
              <div className='item-value'>{activeGoal?.text}</div>
            </div> */}
          </div>
          <Footer />
        </div>
        {/* <ItemInput
          item={planItem}
          setItem={setPlanItem}
          itemType='Plan Item'
          items={plan}
          handleAdd={addPlanItem}
        /> */}
      </div>
    </UserLayout>
  );
};

export default PlanForGoal;
