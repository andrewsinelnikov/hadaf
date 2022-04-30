import React from "react";
import Countdown from "../components/global/Countdown";
import ExceptionalPageLayout from "../components/layouts/ExceptionalPageLayout";

const Home = () => {
  return (
    <ExceptionalPageLayout>
      <h2>Home page</h2>
      <Countdown date={new Date("05/01/2022")} />
    </ExceptionalPageLayout>
  );
};

export default Home;
