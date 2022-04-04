import { Link } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <nav
      className='navbar'
      style={{ position: "sticky", top: 0, left: 0, zIndex: 9 }}>
      <div className='navbar__wrapper'>
        <Link className='navbar__brand' to='/'>
          Navbar
        </Link>
        <button
          className='navbar__toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar__togglerIcon'></span>
        </button>
        <div className='collapse navbar__collapse' id='navbarSupportedContent'>
          <Search />
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
