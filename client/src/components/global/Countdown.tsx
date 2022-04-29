import { useState, useEffect } from "react";

const Countdown = () => {
  const [left, setLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // const date = new Date();
  // date.setDate(date.getDate() + 1);
  // date.setHours(0, 0, 0);
  // const countDate = new Date(date).getTime();

  return (
    <div>
      <h1>Countdown</h1>
    </div>
  );
};

export default Countdown;
