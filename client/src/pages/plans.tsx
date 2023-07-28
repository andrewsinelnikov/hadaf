import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
import ItemInput from "../components/workboard/ItemInput";
import { IItem, InputChange } from "../utils/TypeScript";
import Footer from "../components/global/Footer";
import { currentWeek } from "../utils/CurrentWeek";
import Tab from "../components/global/Tabs/Tab";
import TabPanel from "../components/global/Tabs/TabPanel";
import { getSeason } from "../utils/getSeason";
import { getPlansByGoal } from "../redux/actions/planAction";
import ItemList from "../components/workboard/ItemList";

interface IDay {
  [key: number]: { date?: Date; ref: React.RefObject<HTMLButtonElement> };
}

const Plans: React.FC = () => {
  const { auth, goals, plans } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState("week");

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const [goalsWithPlans, setGoalsWithPlans] = useState<Array<IItem>>([]);
  const [goalsWithNoPlans, setGoalsWithNoPlans] = useState<Array<IItem>>([]);
  const [goalPlans, setGoalPlans] = useState<Array<IItem>>([]);
  const [activeGoal, setActiveGoal] = useState<string | null>(null);

  useEffect(() => {
    const data = goals.filter((goal) =>
      plans.some((plan) => plan.goal === goal._id)
    );
    goalsWithPlans.push(...data);
    const data2 = goals.filter(
      (goal) => !data.some((plan) => plan._id === goal._id)
    );
    goalsWithNoPlans.push(...data2);

    // if (goalsWithPlans.length === 1) {
    if (goalsWithPlans) {
      if (plans.every((item) => item.goal !== goalsWithPlans[0]._id)) {
        dispatch(getPlansByGoal(goalsWithPlans[0]._id!, auth.access_token!));
      } else {
        const data3 = plans.filter(
          (item) => item.goal === goalsWithPlans[0]._id
        );
        if (!data3) return;
        setGoalPlans(data3);
      }
      setActiveGoal(goalsWithPlans[0].text);
    }
  }, [goals, plans]);

  const renderActiveGoalPlans = () => {
    if (activeGoal !== null) {
      return (
        <ItemList
          items={goalPlans}
          setItems={setGoalPlans}
          action='plans'
          options={true}
        />
      );
    } else {
      return null;
    }
  };

  const handleChange = (event: InputChange) => {
    const goal = event.target.value;
    setActiveGoal(goal);
    const selectedGoal = goalsWithPlans.find((item) => item._id === goal);
    if (selectedGoal) {
      if (plans.every((item) => item.goal !== selectedGoal._id)) {
        dispatch(getPlansByGoal(selectedGoal._id!, auth.access_token!));
      } else {
        const data4 = plans.filter((item) => item.goal === selectedGoal._id);
        if (!data4) return;
        setGoalPlans(data4);
      }
      // renderActiveGoalPlans();
    }
  };

  const date = new Date();
  const today = date.getDay();
  const week = currentWeek(date);
  // let tabValues: IDay = week.reduce((acc, cur) => {
  //   const key = cur.getDay()
  //   acc[key] = { date: cur, ref: useRef(null) };
  //   return acc;
  // }, {});

  const tabValues: IDay = {
    1: { ref: useRef(null) },
    2: { ref: useRef(null) },
    3: { ref: useRef(null) },
    4: { ref: useRef(null) },
    5: { ref: useRef(null) },
    6: { ref: useRef(null) },
    7: { ref: useRef(null) },
  };

  Object.keys(tabValues).forEach((key) => {
    tabValues[key as unknown as number].date =
      week[(key as unknown as number) - 1];
  });

  const [selectedTab, setSelectedTab] = useState(today);

  const tabs = Object.keys(tabValues);

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const tabCount = Object.keys(tabValues).length;

    if (event.key === "ArrowLeft") {
      const last = tabCount;
      const next = selectedTab - 1;
      handleNextTab(last, next, 1);
    }
    if (event.key === "ArrowRight") {
      const first = 1;
      const next = selectedTab + 1;
      handleNextTab(first, next, tabCount);
    }
  };

  const handleNextTab = (
    firstTabInRound: number,
    nextTab: number,
    lastTabInRound: number
  ) => {
    const tabToSelect =
      selectedTab === lastTabInRound ? firstTabInRound : nextTab;
    setSelectedTab(tabToSelect);
    tabValues[tabToSelect].ref.current?.focus();
  };

  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      index: index,
      tabPanelId: `tabpanel-${index}`,
      date: tabValues[index].date!,
      tabRef: tabValues[index].ref,
      handleChanged: handleClick,
      selectedTab: selectedTab,
      today: today,
    };
  };

  const a11yPanelProps = (index: number) => {
    return {
      id: `tabpanel-${index}`,
      tabId: `tab-${index}`,
      tabIndex: index,
      selectedTab: selectedTab,
    };
  };

  const [planItem, setPlanItem] = useState<string>("");
  const [day, setDay] = useState<Array<IItem>>([]);

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
            <TimeReminder action='plans' type={type} setType={setType} />
            {type === "week" && (
              <div>
                {/* {tabValues[selectedTab].date!.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })} */}
                <div
                  className='tab-headers'
                  // className='tabs'
                  role='tablist'
                  aria-label='user tabs'
                  onKeyDown={handleKeyPress}>
                  {tabs.map((tab) => (
                    <Tab key={tab} {...a11yProps(parseInt(tab))} />
                  ))}
                </div>
                {tabs.map((panel) => (
                  <TabPanel key={panel} {...a11yPanelProps(parseInt(panel))}>
                    {panel} {selectedTab}
                  </TabPanel>
                ))}
              </div>
            )}
            {type === "season" && (
              <div>
                <h2>{goals.length === 0 && "No goals"}</h2>
                <div className='items'>
                  {/* item-goal item-title */}
                  {/* <select className='item item-goal item-title item-select'>
                    <option value='0'>{goals[0].text}</option>
                    <option value='1'>{goals[1].text}</option>
                  </select> */}
                  {goalsWithNoPlans.length !== 0 && (
                    <>
                      <p>
                        Map out your goal
                        {goalsWithNoPlans.length === 1 ? "" : "s"}
                      </p>
                      {goalsWithNoPlans.map((goal) => (
                        <div key={goal._id} className='item item-goal'>
                          <div className='item-noplan'>
                            <div className='text'>{goal.text}</div>
                            <div className='item-options'>
                              <Link
                                to={`/plan/${goal._id}`}
                                className='btn btn-auto btn-success'>
                                Make plans
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {goalsWithPlans.length !== 0 &&
                    (goalsWithPlans.length === 1 ? (
                      <>
                        <p>{getSeason(new Date())} plans (for goal)</p>
                        <ItemList
                          items={goalPlans}
                          setItems={setGoalPlans}
                          action='plans'
                          options={true}
                          goal={goalsWithPlans[0].text}
                        />
                      </>
                    ) : (
                      <>
                        <p>{getSeason(new Date())} plans (by goals)</p>
                        <select
                          value={activeGoal!}
                          onChange={handleChange}
                          className='item item-goal item-title item-select'>
                          {goalsWithPlans.map((goal) => (
                            <option value={goal._id}>{goal.text}</option>
                          ))}
                        </select>
                        {renderActiveGoalPlans()}
                      </>
                    ))}
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
        <ItemInput itemType='Plan' />
      </div>
    </UserLayout>
  );
};

export default Plans;
