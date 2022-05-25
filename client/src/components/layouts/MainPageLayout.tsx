import React from "react";
import Navbar from "../global/Navbar";

const MainPageLayout: React.FC<{}> = ({ children }) => {
  // https://stackoverflow.com/questions/65605219/rendre-footer-component-all-page-except-404-pages-in-react

  return (
    <>
      <Navbar />
      <div className='container'>{children}</div>
    </>
  );
};

export default MainPageLayout;
