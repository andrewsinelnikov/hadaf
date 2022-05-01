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
    // let lastday = date.getDate() - (date.getDay() - 1) + 6;
    // return new Date(date.setDate(lastday));

    let curr = new Date(); // get current date
    let lastday;
    if (curr.getDay() === 0) return (lastday = endOfDay());
    let first = curr.getDate() - curr.getDay() - 1; // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    let firstday = new Date(curr.setDate(first));
    lastday = new Date(curr.setDate(last));
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
