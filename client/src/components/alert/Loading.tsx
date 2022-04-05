import React from "react";

const Loading = () => {
  return (
    <div className='loading'>
      <svg width='205' height='250' viewBox='0 0 40 50'>
        <i className='fa fa-long-arrow-right arrow' aria-hidden='true'></i>
        <text fill='#e7e0b9' x='5' y='47'>
          Hadaf
        </text>
      </svg>
    </div>
  );
};

export default Loading;
