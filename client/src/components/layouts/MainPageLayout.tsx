import React from "react";
import Navbar from "../global/Navbar";

const MainPageLayout: React.FC<{}> = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default MainPageLayout;
