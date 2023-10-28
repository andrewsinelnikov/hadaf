import React from "react";
import Navbar from "../global/Navbar";

const MainPageLayout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='container'>{children}</div>
    </>
  );
};

export default MainPageLayout;
