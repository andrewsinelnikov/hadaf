import React from "react";
import MainPageLayout from "./MainPageLayout";

const ExceptionalPageLayout: React.FC<{}> = ({ children }) => {
  return <MainPageLayout>{children}</MainPageLayout>;
};

export default ExceptionalPageLayout;
