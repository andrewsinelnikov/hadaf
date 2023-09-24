import { useState } from "react";
import { useLocation } from "react-router-dom";

import Brand from "./Brand";
import Search from "./Search";
import Menu from "./Menu";

interface IProps {
  navbarType?: number;
}

const Navbar: React.FC<IProps> = ({ navbarType }: IProps) => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <nav
      className='navbar'
      // style={
      //   pathname === "/login" || pathname === "/register"
      //     ? { backgroundColor: "var(--light-color)" }
      //     : {}
      // }
    >
      <div className='navbar-wrapper'>
        <Brand />
        {navbarType === 1 && <Search open={openSearch} />}
        <Menu openSearch={openSearch} setOpenSearch={setOpenSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
