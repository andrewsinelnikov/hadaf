import { useState, useEffect } from "react";

interface IProps {
  date: Date;
  setDays?: React.Dispatch<React.SetStateAction<number>>;
  showDays?: boolean;
}

const Countdown = ({ date, setDays, showDays = false }: IProps) => {
  const countdownTime = date.getTime();
  const [left, setLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timerID = setInterval(() => leftTime(), 1000);
    return () => clearInterval(timerID);
  }, [date]);

  const leftTime = () => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (countdownTime) {
      const currentTime = new Date().getTime();
      const gap = countdownTime - currentTime;

      if (gap > 0) {
        const days = Math.floor(gap / day);
        const hours = Math.floor((gap % day) / hour);
        const minutes = Math.floor((gap % hour) / minute);
        const seconds = Math.floor((gap % minute) / second);

        setLeft({ days, hours, minutes, seconds });
        setDays && setDays(days);
      } else {
        setExpired(true);
        setDays && setDays(0);
      }
    }
  };

  if (expired) return <p>—</p>;

  if (showDays && left.days > 0) {
    return (
      <p>
        <span className="countdown-days">
          {left.days === 1 ? "1 day" : `${left.days} days`}
        </span>
        {" "}
        {(left.hours > 9 ? left.hours : `0${left.hours}`)}:
        {(left.minutes > 9 ? left.minutes : `0${left.minutes}`)}:
        {(left.seconds > 9 ? left.seconds : `0${left.seconds}`)}
      </p>
    );
  }

  return (
    <p>
      {(left.hours > 9 ? left.hours : `0${left.hours}`) || "00"}:
      {(left.minutes > 9 ? left.minutes : `0${left.minutes}`) || "00"}:
      {(left.seconds > 9 ? left.seconds : `0${left.seconds}`) || "00"}
    </p>
  );
};

export default Countdown;