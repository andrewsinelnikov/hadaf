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
import { getPlanById, getPlansByGoal } from "../redux/actions/planAction";
import ItemList from "../components/workboard/ItemList";
import { createDay, getDay } from "../redux/actions/dayAction";

interface IDate {
  [key: number]: { date?: Date; ref: React.RefObject<HTMLButtonElement> };
}

const Plans: React.FC = () => {
  const { auth, goals, plans, planItem, day } = useAppSelector(
    (state: RootState) => state
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let season = getSeason(new Date());

  const [type, setType] = useState("week");

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const [goalsWithPlans, setGoalsWithPlans] = useState<Array<IItem>>([]);
  const [goalsWithNoPlans, setGoalsWithNoPlans] = useState<Array<IItem>>([]);
  const [goalPlans, setGoalPlans] = useState<Array<IItem>>([]);
  const [activeGoal, setActiveGoal] = useState<string | null>(null);

  useEffect(() => {
    if (!goals) return;
    const data = goals.filter((goal) =>
      plans.some((plan) => plan.goal === goal._id)
    );
    goalsWithPlans.push(...data);
    const data2 = goals.filter(
      (goal) => !data.some((plan) => plan._id === goal._id)
    );
    goalsWithNoPlans.push(...data2);

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
      setActiveGoal(goalsWithPlans[0]._id!);
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
    }
  };

  const date = new Date();
  const today = date.getDay() + (date.getDay() === 0 ? 7 : 0);
  const week = currentWeek(date);

  const tabValues: IDate = {
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

  const tabs = Object.keys(tabValues);

  const [selectedTab, setSelectedTab] = useState(today);

  useEffect(() => {
    if (auth.access_token)
      dispatch(
        getDay(
          tabValues[selectedTab].date!.toISOString().split("T")[0],
          auth.access_token
        )
      );
  }, [dispatch, auth.access_token, selectedTab]);

  useEffect(() => {
    if ((!day || day === null) && selectedTab >= today) {
      dispatch(
        createDay(
          tabValues[selectedTab].date!.toISOString().split("T")[0],
          auth.access_token!
        )
      );
    }
  }, [dispatch, day, selectedTab]);

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

  // const [planItem, setPlanItem] = useState<string>("");
  const [dayPlan, setDayPlan] = useState<IItem[]>([]);
  let planArr: IItem[];
  let possiblePlans: IItem[];

  function getElemsNotAdded(generalArray: IItem[], addedElements: IItem[]) {
    // Create an empty array to store the plans that are not in addedElements.
    const leftElements = [];

    // Iterate over the generalArray array.
    for (const elem of generalArray) {
      // Check if the elem is in addedElements.
      const isElemInAddedElements = addedElements.some(
        (item) => item._id === elem._id
      );

      // If the plan is not in addedElements, add it to the leftElements array.
      if (!isElemInAddedElements) {
        leftElements.push(elem);
      }
    }

    // Return the leftElements array.
    return leftElements;
  }

  useEffect(() => {
    planArr = [];
    if (day && day.plans) {
      day.plans.map((plan) => {
        const planForDay = plans.find((item) => item._id === plan.plan_id);
        if (planForDay) planArr.push(planForDay);
      });
    }
    setDayPlan(planArr);

    possiblePlans = getElemsNotAdded(plans, dayPlan);
  }, [day, selectedTab, type]);

  const addPlanItem = (e: React.FormEvent) => {
    e.preventDefault();

    // if (planItem) {
    // setDay([
    //   ...day,
    //   {
    //     _id: Date.now().toLocaleString(),
    //     createdAt: Date.now().toLocaleString(),
    //     text: planItem,
    //     isDone: false,
    //   },
    // ]);
    // setPlanItem("");
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
                <div
                  className='tab-headers'
                  role='tablist'
                  aria-label='user tabs'
                  onKeyDown={handleKeyPress}>
                  {tabs.map((tab) => (
                    <Tab key={tab} {...a11yProps(parseInt(tab))} />
                  ))}
                </div>
                {tabs.map((panel) => (
                  <TabPanel key={panel} {...a11yPanelProps(parseInt(panel))}>
                    {/* {panel} {selectedTab} */}

                    {/* {day &&
                      day.plans &&
                      day.plans.map((plan) => <div>{plan.plan_id}</div>)} */}
                    {dayPlan && (
                      <ItemList items={dayPlan} action='plansForDay' />
                    )}
                    {/*  dayPlan.map((item) => (
                         <div key={item._id}>{item.text}</div>
                       ))} */}
                  </TabPanel>
                ))}
              </div>
            )}
            {type === "season" && (
              <>
                {goals.length === 0 && (
                  <div className='items-zero'>
                    <div className='items-message'>
                      <span>What do you want to achieve this {season}?</span>
                      <Link to='/goals'>Set Goals</Link>
                    </div>
                  </div>
                )}
                <div className='items'>
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
                        <p>{getSeason(new Date())} Plans (for Goal)</p>
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
                        <p>{getSeason(new Date())} Plans (by Goals)</p>
                        <select
                          value={activeGoal!}
                          onChange={handleChange}
                          className='item item-goal item-title item-select'>
                          {goalsWithPlans.map((goal) => (
                            <option key={goal._id} value={goal._id}>
                              {goal.text}
                            </option>
                          ))}
                        </select>
                        {renderActiveGoalPlans()}
                      </>
                    ))}
                </div>
              </>
            )}
          </div>
          <Footer />
        </div>
        {type === "week" && <ItemInput itemType='Step' />}
        {type === "season" && (
          <ItemInput itemType='Plan' activeGoal={activeGoal!} />
        )}
      </div>
    </UserLayout>
  );
};

export default Plans;
