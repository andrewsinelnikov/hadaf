import React from "react";

interface IProps {
  children: React.ReactNode;
}

const AuthPageLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className='auth_layout'>
      {children}
    </div>
  );
};

export default AuthPageLayout;