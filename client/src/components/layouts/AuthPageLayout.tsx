import React from "react";
import Footer from "../global/Footer";

const AuthPageLayout: React.FC<{}> = (props) => {
  // https://stackoverflow.com/questions/65605219/rendre-footer-component-all-page-except-404-pages-in-react

  return (
    <>
      <div className='container'>{props.children}</div>
      <Footer />
    </>
  );
};

export default AuthPageLayout;
