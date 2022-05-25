import React from "react";
import Navbar from "../global/Navbar";

const HomePageLayout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='container'>{children}</div>
    </>
  );
};

export default HomePageLayout;
