import React from "react";
import Countdown from "../components/global/Countdown";
import ExceptionalPageLayout from "../components/layouts/ExceptionalPageLayout";

const Home = () => {
  const endOfWeek = (date: Date) => {
    let lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));
  };
  return (
    <ExceptionalPageLayout>
      <h2>Home page</h2>
      {/* <Countdown date={new Date("05/01/2022")} /> */}
      <Countdown date={endOfWeek(new Date())} />
    </ExceptionalPageLayout>
  );
};

export default Home;
