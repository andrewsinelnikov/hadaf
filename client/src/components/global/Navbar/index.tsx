import { useState } from "react";
import Brand from "./Brand";
import Search from "./Search";
import Menu from "./Menu";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <nav className='navbar'>
      <div className='navbar-wrapper'>
        <Brand />
        <Search open={openSearch} />
        <Menu openSearch={openSearch} setOpenSearch={setOpenSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
