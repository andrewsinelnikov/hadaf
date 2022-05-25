import React from "react";
import MainPageLayout from "./MainPageLayout";

interface IProps {
  bg?: String;
  children?: React.ReactNode;
}

const ExceptionalPageLayout = ({ bg, children }: IProps) => {
  return <MainPageLayout bg={bg}>{children}</MainPageLayout>;
};

export default ExceptionalPageLayout;
