import React from "react";

const Loading = () => {
  return (
    <div className='loading'>
      <svg height='240' width='240' viewBox='0 0 40 50'>
        <line className='loader-pointer' x1='120' y1='120' x2='120' y2='97' />
        <line className='loader-line' x1='120' y1='120' x2='135' y2='120' />
        <circle className='loader-circle' cx='120' cy='120' r='30' />
        <circle className='loader-center' cx='120' cy='120' r='5' />
        {/* <text fill='#e7e0b9' x='5' y='47'>
          Hadaf
        </text> */}
      </svg>
    </div>
  );
};

export default Loading;
