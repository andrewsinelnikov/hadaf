import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
// import UserPosts from "../components/profile/UserPosts";
import ItemInput from "../components/workboard/ItemInput";
import { IItem } from "../utils/TypeScript";
import Footer from "../components/global/Footer";

const Actions = () => {
  const { auth, plans } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const [action, setAction] = useState<string>("");
  const [actions, setActions] = useState<Array<IItem>>([]);

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();

    // if (action) {
    //   setActions([
    //     ...actions,
    //     { _id: Date.now(), text: action, isDone: false },
    //   ]);
    //   setAction("");
    // }
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <div className='content'>
            <TimeReminder action='actions' />
            <div className='items-zero'>
              <div className='items-message'>
                Back up the Plan with Actions to turn your Goals into Reality
              </div>
            </div>
          </div>
          <Footer />
        </div>
        {/* <ItemInput
          item={action}
          setItem={setAction}
          itemType='Task'
          items={actions}
          handleAdd={addAction}
        /> */}
        {plans.length === 0 && <ItemInput itemType='NoPlans' />}
      </div>
    </UserLayout>
  );
};

export default Actions;
