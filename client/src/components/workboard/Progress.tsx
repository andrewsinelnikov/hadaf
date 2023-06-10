import React from "react";

interface IProps {
  completed: number;
}

const Progress: React.FC<IProps> = ({ completed }) => {
  return (
    <div>
      <div>
        <span>completed</span>
      </div>
    </div>
  );
};

export default Progress;
