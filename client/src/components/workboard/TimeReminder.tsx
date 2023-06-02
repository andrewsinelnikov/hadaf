import { useState } from "react";

import { ButtonClick } from "../../utils/TypeScript";
import Countdown from "../global/Countdown";
import { endOfDay, endOfSeason, endOfWeek } from "../../utils/FindEnd";

interface IProps {
  message?: string;
}

const TimeReminder = ({ message = "What are waiting for?" }: IProps) => {
  const timeBtns = [
    { key: 1, label: "day" },
    { key: 2, label: "week" },
    { key: 3, label: "season" },
  ];

  const [active, setActive] = useState("day");

  const handleClick = (e: ButtonClick) => {
    e.preventDefault();
    setActive(e.currentTarget.id);
  };

  const isActive = (time: string) => {
    if (active === time) return "time-active";
  };

  return (
    <div className='reminder'>
      <div className='reminder-time'>
        {(() => {
          switch (active) {
            case "day":
              return (
                <>
                  <p>The day ends in</p>
                  <Countdown date={endOfDay()} />
                </>
              );
            case "week":
              return (
                <>
                  <p>The week ends in</p>
                  <Countdown date={endOfWeek()} />
                </>
              );
            case "season":
              return (
                <>
                  <p>The season ends in</p>
                  <Countdown date={endOfSeason()} />
                </>
              );
            default:
              return null;
          }
        })()}
        {timeBtns.map((btn) => (
          <button
            key={btn.key}
            className={`btn btn-time ${isActive(btn.label)}`}
            id={btn.label}
            onClick={handleClick}>
            {btn.label}
          </button>
        ))}
      </div>
      <div className='reminder-message'>{message}</div>
    </div>
  );
};

export default TimeReminder;
