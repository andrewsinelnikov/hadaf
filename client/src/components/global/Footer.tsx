import React from "react";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-wrapper'>
        <div className='footer-rights'>
          &copy; {new Date().getFullYear()} Hadaf
        </div>
        <ul className='footer-info'>
          <li>
            <a href='!#'>About</a>
          </li>
          <li>
            <a href='!#'>Privacy</a>
          </li>
          <li>
            <a href='!#'>Terms</a>
          </li>
          <li>
            <a href='!#'>Help</a>
          </li>
        </ul>
        <div className='footer-language'></div>
      </div>
    </div>
  );
};

export default Footer;
