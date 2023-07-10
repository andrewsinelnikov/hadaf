import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
import ItemInput from "../components/workboard/ItemInput";
import { IItem } from "../utils/TypeScript";
import Footer from "../components/global/Footer";
import { currentWeek } from "../utils/CurrentWeek";
import Tab from "../components/global/Tabs/Tab";
import TabPanel from "../components/global/Tabs/TabPanel";

interface IDay {
  [key: number]: { date?: Date; ref: React.RefObject<HTMLButtonElement> };
}

const Plans: React.FC = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const day = new Date();
  const today = day.getDay();
  const week = currentWeek(day);
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

  // const headers = Object.values(tabValues).map((item) =>
  //   item.date.toLocaleDateString("en-US", {
  //     weekday: "long",
  //     month: "short",
  //     day: "numeric",
  //   })
  // );

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
      date: tabValues[index].date!.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      tabRef: tabValues[index].ref,
      handleChanged: handleClick,
      selectedTab: selectedTab,
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
  // const [plan, setPlan] = useState<Array<IItem>>([]);

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
              {/* {currentWeek(today).map((day) =>
                day.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })
              )} */}

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
                  <Tab key={tab} {...a11yProps(tab as unknown as number)} />
                ))}
              </div>
              {tabs.map((panel) => (
                <TabPanel
                  key={panel}
                  {...a11yPanelProps(panel as unknown as number)}>
                  selectedTab
                  {selectedTab}
                </TabPanel>
              ))}
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
