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

  useEffect(() => {
    let timerID = setInterval(() => leftTime(), 1000);

    return () => clearTimeout(timerID);
  }, [date]);

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

      setLeft({ days, hours, minutes, seconds });
    }
  };

  return (
    <p>
      {left.days
        ? left.days > 9
          ? `${left.days} days `
          : left.days === 1
          ? "1 day "
          : `0${left.days}days `
        : ""}
      {/* {left.days ? (left.days > 9 ? `${left.days} days ` : `0${left.days}:`) : ""} */}
      {(left.hours > 9 ? left.hours : `0${left.hours}`) || "00"}:
      {(left.minutes > 9 ? left.minutes : `0${left.minutes}`) || "00"}:
      {(left.seconds > 9 ? left.seconds : `0${left.seconds}`) || "00"}
    </p>
  );
};

export default Countdown;
