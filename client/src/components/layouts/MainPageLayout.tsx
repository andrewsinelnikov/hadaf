import React from "react";
import Navbar from "../global/Navbar";

interface IProps {
  bg?: String;
  children?: React.ReactNode;
}

const MainPageLayout = ({ bg, children }: IProps) => {
  // https://stackoverflow.com/questions/65605219/rendre-footer-component-all-page-except-404-pages-in-react

  return (
    <>
      <Navbar />
      <div className='container' style={{ background: `${bg}` }}>
        {children}
      </div>
    </>
  );
};

export default MainPageLayout;
