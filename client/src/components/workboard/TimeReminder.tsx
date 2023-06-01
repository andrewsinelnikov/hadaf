import { useState } from "react";

const TimeReminder = () => {
  const [active, setActive] = useState();
  return (
    <div>
      <button className={active === "day" ? "time-active" : undefined}>
        Day
      </button>
      <button className={active === "week" ? "time-active" : undefined}>
        Week
      </button>
      <button className={active === "season" ? "time-active" : undefined}>
        Season
      </button>
    </div>
  );
};

export default TimeReminder;
