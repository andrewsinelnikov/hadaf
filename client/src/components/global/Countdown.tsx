import { useState, useEffect } from "react";

const Countdown = () => {
  const [countdownDate, setCountdownDate] = useState(
    new Date("4/30/2022").getTime()
  );
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

  const leftTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();
      const gap = countdownDate - currentTime;

      let days = Math.floor(gap / (1000 * 60 * 60 * 24));
    }
  };

  return (
    <div>
      <h1>Countdown</h1>
    </div>
  );
};

export default Countdown;
