import { useState, useEffect } from "react";

interface IProps {
  date: Date;
}

const Countdown = ({ date }: IProps) => {
  const countdownTime = date.getTime();
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

  useEffect(() => {
    let timerID = setInterval(() => leftTime(), 1000);

    return () => clearTimeout(timerID);
  }, []);

  const leftTime = () => {
    if (countdownTime) {
      const currentTime = new Date().getTime();
      const gap = countdownTime - currentTime;

      let second = 1000;
      let minute = second * 60;
      let hour = minute * 60;
      let day = hour * 24;

      let days = Math.floor(gap / day);
      let hours = Math.floor((gap % day) / hour);
      let minutes = Math.floor((gap % hour) / minute);
      let seconds = Math.floor((gap % minute) / second);

      // const numbersToAddZeroTo = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      // days = `${days === "0" ? "" : days}`;
      // if (numbersToAddZeroTo.includes(hours)) {
      //   hours = `0${hours}`;
      // } else if (numbersToAddZeroTo.includes(minutes)) {
      //   minutes = `0${minutes}`;
      // } else if (numbersToAddZeroTo.includes(seconds)) {
      //   seconds = `0${seconds}`;
      // }

      setLeft({ days, hours, minutes, seconds });
    }
  };

  return (
    <div>
      {left.days ? (left.days > 9 ? `${left.days}:` : `0${left.days}:`) : ""}
      {(left.hours > 9 ? left.hours : `0${left.hours}`) || "00"}:
      {(left.minutes > 9 ? left.minutes : `0${left.minutes}`) || "00"}:
      {(left.seconds > 9 ? left.seconds : `0${left.seconds}`) || "00"}
    </div>
  );
};

export default Countdown;
