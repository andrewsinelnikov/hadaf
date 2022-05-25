import React from "react";
import Countdown from "../components/global/Countdown";
import ExceptionalPageLayout from "../components/layouts/ExceptionalPageLayout";
import { endOfDay } from "../utils/FindEnd";

const Home = () => {
  const endOfWeek = () => {
    let date = new Date();
    if (date.getDay() === 0) return endOfDay();
    let first = date.getDate() - date.getDay() + 1;
    let last = first + 6;
    date.setDate(last + 1);
    return new Date(date.setHours(0, 0, 0));
  };

  const endOfSeason = () => {
    let date = new Date();
    if (date.getDay() === 0) return endOfDay();
    switch (date.getMonth()) {
      case 0:
      case 1:
      case 12:
        date.setDate(1);
        date.setMonth(2);
        date.setHours(0, 0, 0);
        break;
      case 2:
      case 3:
      case 4:
        date.setDate(1);
        date.setMonth(5);
        date.setHours(0, 0, 0);
        break;
      case 5:
      case 6:
      case 7:
        date.setDate(1);
        date.setMonth(8);
        date.setHours(0, 0, 0);
        break;
      case 8:
      case 9:
      case 10:
        date.setDate(1);
        date.setMonth(11);
        date.setHours(0, 0, 0);
        break;
    }

    return new Date(date);
  };

  // console.log(endOfWeek());
  // console.log(endOfSeason());
  return (
    <ExceptionalPageLayout>
      <h2>Home page</h2>
      Today <Countdown date={endOfDay()} />
      Week <Countdown date={endOfWeek()} />
      Season <Countdown date={endOfSeason()} />
    </ExceptionalPageLayout>
  );
};

export default Home;
