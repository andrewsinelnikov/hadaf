import { useState } from "react";

const TimeReminder = () => {
  const [active, setActive] = useState();
  return (
    <div>
      <button
        className={active === "day" ? "time-active" : undefined}
        id={"day"}
        onClick={hanleActive}>
        Day
      </button>
      <button
        className={active === "week" ? "time-active" : undefined}
        id={"week"}
        onClick={hanleActive}>
        Week
      </button>
      <button
        className={active === "season" ? "time-active" : undefined}
        id={"season"}
        onClick={hanleActive}>
        Season
      </button>
    </div>
  );
};

export default TimeReminder;
