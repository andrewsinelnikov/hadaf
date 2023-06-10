import React from "react";

interface IProps {
  completed?: number;
}

const Progress: React.FC<IProps> = ({ completed }) => {
  return (
    <div className='progress'>
      <div className='progress-filler' style={{ width: `${completed}%` }} />
    </div>
  );
};

export default Progress;
