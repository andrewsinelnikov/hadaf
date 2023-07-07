import React from "react";

interface IProps {
  children: React.ReactNode;
  id: string;
  tabId: string;
  tabIndex: number;
  selectedTab: number;
}

const TabPanel: React.FC<IProps> = () => {
  return (
    <div>
      <h2>TabPanel</h2>
    </div>
  );
};

export default TabPanel;
