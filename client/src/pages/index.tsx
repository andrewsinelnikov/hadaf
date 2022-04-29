import React from "react";
import Countdown from "../components/global/Countdown";
import ExceptionalPageLayout from "../components/layouts/ExceptionalPageLayout";

const Home = () => {
  return (
    <ExceptionalPageLayout>
      <h2>Home page</h2>
      <Countdown />
    </ExceptionalPageLayout>
  );
};

export default Home;
