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

  const endOfWeek = (date: Date) => {
    let lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));
  };

  console.log(endOfWeek(new Date()).toString());
  return (
    <ExceptionalPageLayout>
      <h2>Home page</h2>
      <Countdown date={endOfDay()} />
      {/* <Countdown date={endOfWeek(new Date())} /> */}
    </ExceptionalPageLayout>
  );
};

export default Home;
