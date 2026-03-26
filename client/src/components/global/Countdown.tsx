import { useState, useEffect } from "react";

interface IProps {
  date: Date;
  setDays?: React.Dispatch<React.SetStateAction<number>>;
  showDays?: boolean;
  showLabels?: boolean;
}

const Countdown = ({ date, setDays, showDays = false, showLabels = false }: IProps) => {
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

  const pad = (n: number) => (n > 9 ? `${n}` : `0${n}`);

  if (expired) return <p>—</p>;

  if (showLabels) {
    return (
      <div className='countdown-labeled'>
        {showDays && left.days > 0 && (
          <>
            <div className='countdown-unit'>
              <span className='countdown-value'>{pad(left.days)}</span>
              <span className='countdown-label'>days</span>
            </div>
            <span className='countdown-sep'>:</span>
          </>
        )}
        <div className='countdown-unit'>
          <span className='countdown-value'>{pad(left.hours)}</span>
          <span className='countdown-label'>hours</span>
        </div>
        <span className='countdown-sep'>:</span>
        <div className='countdown-unit'>
          <span className='countdown-value'>{pad(left.minutes)}</span>
          <span className='countdown-label'>min</span>
        </div>
        <span className='countdown-sep'>:</span>
        <div className='countdown-unit'>
          <span className='countdown-value'>{pad(left.seconds)}</span>
          <span className='countdown-label'>sec</span>
        </div>
      </div>
    );
  }

  if (showDays && left.days > 0) {
    return (
      <p>
        <span className='countdown-days'>
          {left.days === 1 ? "1 day" : `${left.days} days`}
        </span>
        {" "}
        {pad(left.hours)}:{pad(left.minutes)}:{pad(left.seconds)}
      </p>
    );
  }

  return (
    <p>
      {pad(left.hours) || "00"}:
      {pad(left.minutes) || "00"}:
      {pad(left.seconds) || "00"}
    </p>
  );
};

export default Countdown;