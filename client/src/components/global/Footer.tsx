import React from "react";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-wrapper'>
        <div className='footer-rights'>
          &copy; {new Date().getFullYear()} Hadaf
        </div>
        <ul className='footer-info'></ul>
        <div className='footer-language'></div>
      </div>
    </div>
  );
};

export default Footer;
