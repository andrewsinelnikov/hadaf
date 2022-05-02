import React from "react";
import Countdown from "../components/global/Countdown";
import ExceptionalPageLayout from "../components/layouts/ExceptionalPageLayout";

const Home = () => {
  const endOfDay = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0);
    return new Date(date);
  };

  const endOfWeek = () => {
    let currentDate = new Date();
    let lastday;
    if (currentDate.getDay() === 0) return (lastday = endOfDay());
    let first = currentDate.getDate() - currentDate.getDay() + 1;
    let last = first + 6;
    currentDate.setDate(last + 1);
    lastday = new Date(currentDate.setHours(0, 0, 0));
    return lastday;
  };

  const endOfSeason = () => {
    let date = new Date();
    switch (date.getMonth()) {
      case 0:
      case 1:
      case 12:
        date.setDate(1);
        date.setMonth(3);
        date.setHours(0, 0, 0);
        break;
      case 3:
      case 4:
      case 5:
        date.setDate(1);
        date.setMonth(6);
        date.setHours(0, 0, 0);
        break;
      case 6:
      case 7:
      case 8:
        date.setDate(1);
        date.setMonth(9);
        date.setHours(0, 0, 0);
        break;
      case 9:
      case 10:
      case 11:
        date.setDate(1);
        date.setMonth(12);
        date.setHours(0, 0, 0);
        break;
    }

    // return lastday;
  };

  // console.log(endOfWeek());
  return (
    <ExceptionalPageLayout>
      <h2>Home page</h2>
      <Countdown date={endOfDay()} />
      <Countdown date={endOfWeek()} />
    </ExceptionalPageLayout>
  );
};

export default Home;
