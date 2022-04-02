import React from "react";
import MainPageLayout from "./MainPageLayout";

const ExceptionalPageLayout: React.FC<{}> = (props) => {
  return <MainPageLayout>{props.children}</MainPageLayout>;
};

export default ExceptionalPageLayout;
