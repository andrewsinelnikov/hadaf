import React from "react";

interface IProps {
  id: string;
  date: Date;
  today: number;
  selectedTab: number;
  index: number;
  tabPanelId: string;
  handleChanged: (event: any) => void;
  tabRef: React.LegacyRef<HTMLButtonElement>;
}

const Tab: React.FC<IProps> = ({
  id,
  date,
  today,
  selectedTab,
  index,
  tabPanelId,
  handleChanged,
  tabRef,
}) => {
  const handleClick = () => handleChanged(index);
  console.log(selectedTab, " ", today);
  return (
    <button
      className='tab'
      type='button'
      role='tab'
      id={id}
      aria-selected={selectedTab === index}
      aria-controls={tabPanelId}
      tabIndex={selectedTab === index ? 0 : -1}
      onClick={handleClick}
      ref={tabRef}>
      {date.toLocaleDateString("en-US", {
        weekday: `${today === index ? "long" : "short"}`,
        month: "short",
        day: "numeric",
      })}
    </button>
  );
};

export default Tab;
