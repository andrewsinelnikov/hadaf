import { useState, useEffect } from "react";

import { ButtonClick } from "../../utils/TypeScript";
import Countdown from "../global/Countdown";
import { endOfDay, endOfSeason, endOfWeek } from "../../utils/FindEnd";

interface IProps {
  action: string;
  type?: string;
  setType?: React.Dispatch<React.SetStateAction<string>>;
  message?: string;
  setDays?: React.Dispatch<React.SetStateAction<number>>;
}

const TimeReminder = ({
  action,
  type = "",
  setType,
  message = "What are you waiting for? Meet the challenge",
  setDays,
}: IProps) => {
  const timeBtns = [
    // { key: 1, label: "day" },
    { key: 2, label: "week" },
    { key: 3, label: "season" },
  ];

  const [active, setActive] = useState("");

  useEffect(() => {
    if (action === "actions") setActive("day");
    if (action === "plans") {
      type === "day"
        ? setActive("day")
        : type === "season"
        ? setActive("season")
        : setActive("week");
    }
    if (action === "goals") setActive("season");
    // action === "actions"
    //   ? setActive("day")
    //   : action === "plans"
    //   ? setActive("week")
    //   : setActive("season");
  }, [action, setActive]);

  const handleActive = (e: ButtonClick) => {
    e.preventDefault();
    setActive(e.currentTarget.id);
    if (type && setType) setType(e.currentTarget.id);
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
                  <Countdown date={endOfSeason()} setDays={setDays} showDays={true} />
                </>
              );
            default:
              return null;
          }
        })()}
        {action === "plans" &&
          timeBtns.map((btn) => (
            <button
              key={btn.key}
              className={`btn btn-time ${isActive(btn.label)}`}
              id={btn.label}
              onClick={handleActive}>
              {btn.label}
            </button>
          ))}
      </div>
      <div className='reminder-message'>{message}</div>
    </div>
  );
};

export default TimeReminder;