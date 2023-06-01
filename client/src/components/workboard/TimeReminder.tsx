import { useState } from "react";

import { ButtonClick } from "../../utils/TypeScript";

const TimeReminder = () => {
  const [active, setActive] = useState("");

  const handleClick = (e: ButtonClick) => {
    e.preventDefault();
    setActive(e.currentTarget.id);
  };

  return (
    <div>
      <button
        className={active === "day" ? "time-active" : undefined}
        id={"day"}
        onClick={handleClick}>
        Day
      </button>
      <button
        className={active === "week" ? "time-active" : undefined}
        id={"week"}
        onClick={handleClick}>
        Week
      </button>
      <button
        className={active === "season" ? "time-active" : undefined}
        id={"season"}
        onClick={handleClick}>
        Season
      </button>
    </div>
  );
};

export default TimeReminder;
