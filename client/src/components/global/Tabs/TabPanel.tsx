import React from "react";

interface IProps {
  children: React.ReactNode;
  id: string;
  tabId: string;
  tabIndex: number;
  selectedTab: number;
}

const TabPanel: React.FC<IProps> = ({
  children,
  id,
  tabId,
  tabIndex,
  selectedTab,
}) => {
  return (
    <section
      className='tabpanel'
      role='tabpanel'
      id={id}
      aria-labelledby={tabId}
      hidden={selectedTab !== tabIndex}
      tabIndex={selectedTab}>
      {children}
    </section>
  );
};

export default TabPanel;
