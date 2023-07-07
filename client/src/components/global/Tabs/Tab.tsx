import React from "react";

interface IProps {
  id: string;
  title: string;
  selectedTab: number;
  index: number;
  tabPanelId: string;
  handleChanged: (event: any) => void;
  tabRef: React.LegacyRef<HTMLButtonElement>;
}

const Tab = () => {
  return (
    <div>
      <h2>Tab</h2>
    </div>
  );
};

export default Tab;
