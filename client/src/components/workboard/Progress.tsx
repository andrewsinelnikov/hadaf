import React from "react";

interface IProps {
  completed?: number;
}

const Progress: React.FC<IProps> = ({ completed }) => {
  return (
    <div className='progress'>
      <div className='progress-bar'>
        <div className='progress-filler' style={{ width: `${completed}%` }} />
      </div>
      <span className='item-completeness'>{completed}%</span>
    </div>
  );
};

export default Progress;
