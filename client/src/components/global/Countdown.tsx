import React from "react";

const Countdown = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0);
  const countDate = new Date(date).getTime();

  return (
    <div>
      <h1>Countdown</h1>
    </div>
  );
};

export default Countdown;
