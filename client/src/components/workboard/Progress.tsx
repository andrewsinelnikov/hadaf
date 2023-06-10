import React from "react";

interface IProps {
  completed: number;
}

const Progress: React.FC<IProps> = ({ completed }) => {
  return (
    <div className='progress'>
      <div></div>
    </div>
  );
};

export default Progress;
