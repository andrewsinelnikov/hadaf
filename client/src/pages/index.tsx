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
    let current = new Date(); // get current date
    let lastday;
    if (current.getDay() === 0) return (lastday = endOfDay());
    let first = current.getDate() - current.getDay() + 1;
    let last = first + 6;
    current.setDate(last + 1);
    lastday = new Date(current.setHours(0, 0, 0));
    return lastday;
  };

  console.log(endOfWeek());
  return (
    <ExceptionalPageLayout>
      <h2>Home page</h2>
      <Countdown date={endOfDay()} />
      <Countdown date={endOfWeek()} />
    </ExceptionalPageLayout>
  );
};

export default Home;
