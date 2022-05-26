import React from "react";
import Navbar from "../global/Navbar";

const HomePageLayout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='home'>{children}</div>
    </>
  );
};

export default HomePageLayout;
