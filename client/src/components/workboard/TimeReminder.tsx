import { useState } from "react";

import { ButtonClick } from "../../utils/TypeScript";

const TimeReminder = () => {
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
    <div>
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
  );
};

export default TimeReminder;
