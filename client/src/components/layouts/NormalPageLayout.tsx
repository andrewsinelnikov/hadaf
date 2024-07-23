import React from "react";
import MainPageLayout from "./MainPageLayout";
import Footer from "../global/Footer";

const NormalPageLayout: React.FC<{}> = (props) => {
  return (
    <>
      <MainPageLayout>{props.children}</MainPageLayout>
      <Footer />
    </>
  );
};

export default NormalPageLayout;
