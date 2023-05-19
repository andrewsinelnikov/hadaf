import { useState } from "react";
import { useLocation } from "react-router-dom";

import Brand from "./Brand";
import Search from "./Search";
import Menu from "./Menu";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  // const { pathname } = useLocation();

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
        <Search open={openSearch} />
        <Menu openSearch={openSearch} setOpenSearch={setOpenSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
