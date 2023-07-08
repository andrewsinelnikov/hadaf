import React from "react";

interface IProps {
  id: string;
  date: string;
  selectedTab: number;
  index: number;
  tabPanelId: string;
  handleChanged: (event: any) => void;
  tabRef: React.LegacyRef<HTMLButtonElement>;
}

const Tab: React.FC<IProps> = ({
  id,
  date,
  selectedTab,
  index,
  tabPanelId,
  handleChanged,
  tabRef,
}) => {
  const handleClick = () => handleChanged(index);

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
      {date}
    </button>
  );
};

export default Tab;
