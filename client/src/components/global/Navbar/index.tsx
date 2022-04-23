import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <nav className='navbar'>
      <div className='navbar-wrapper'>
        <h1 className='navbar-brand'>
          <Link to='/'>
            <img
              src='../../../../logo-gold2.png'
              alt='logo'
              className='navbar-logo'
            />{" "}
            HADAF
          </Link>
        </h1>
        <Search open={openSearch} />
        <Menu openSearch={openSearch} setOpenSearch={setOpenSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
