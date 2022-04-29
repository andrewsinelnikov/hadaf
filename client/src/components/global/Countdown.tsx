import { useState, useEffect } from "react";

const Countdown = () => {
  const [countdownDate, setCountdownDate] = useState(
    new Date("4/30/2022").getTime()
  );
  const [left, setLeft] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });
  // const date = new Date();
  // date.setDate(date.getDate() + 1);
  // date.setHours(0, 0, 0);
  // const countDate = new Date(date).getTime();

  useEffect(() => {
    setInterval(() => leftTime(), 1000);
  }, []);

  const leftTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();
      const gap = countdownDate - currentTime;

      let second = 1000;
      let minute = second * 60;
      let hour = minute * 60;
      let day = hour * 24;

      let days = Math.floor(gap / day).toString();
      let hours = Math.floor((gap % day) / hour).toString();
      let minutes = Math.floor((gap % hour) / minute).toString();
      let seconds = Math.floor((gap % minute) / second).toString();

      const numbersToAddZeroTo = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      days = `${days === "0" ? "" : days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setLeft({ days, hours, minutes, seconds });
    }
  };

  return (
    <div>
      {left.days}:{left.hours || "00"}:{left.minutes || "00"}:
      {left.seconds || "00"}
    </div>
  );
};

export default Countdown;
