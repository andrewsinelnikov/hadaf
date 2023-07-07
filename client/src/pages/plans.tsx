import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
import ItemInput from "../components/workboard/ItemInput";
import { IItem } from "../utils/TypeScript";
import Footer from "../components/global/Footer";

const Plans = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  const today = new Date();
  const date = today.toLocaleDateString("en-US", {
    weekday: "narrow",
    month: "short",
    day: "numeric",
  });
  const option = { weekday: "narrow", month: "short", day: "numeric" };

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const [planItem, setPlanItem] = useState<string>("");
  const [plan, setPlan] = useState<Array<IItem>>([]);

  const currentWeek = () => {
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );
    const lastDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 7)
    );

    const daysOfWeek = [];
    for (
      let i = firstDayOfWeek;
      i <= lastDayOfWeek;
      i.setDate(i.getDate() + 1)
    ) {
      daysOfWeek.push(new Date(i));
    }

    return daysOfWeek;
  };

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
            <TimeReminder action='plans' />
            <div>
              {currentWeek().map((day) =>
                day.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })
              )}
            </div>
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

export default Plans;
