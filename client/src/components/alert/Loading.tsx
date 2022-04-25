import React from "react";

const Loading = () => {
  return (
    <div className='loading'>
      <svg width='250' height='250'>
        <line className='loader-pointer' x1='125' y1='125' x2='125' y2='97' />
        <line className='loader-line' x1='125' y1='125' x2='143' y2='125' />
        <circle className='loader-circle' cx='125' cy='125' r='35' />
        <circle className='loader-center' cx='125' cy='125' r='5' />
        <text className='loader-logo' x='95' y='190'>
          Hadaf
        </text>
      </svg>
    </div>
  );
};

export default Loading;
