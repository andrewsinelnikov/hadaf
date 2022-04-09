import { Link } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-wrapper'>
        <h1 className='navbar-left'>
          <Link to='/' className='navbar-brand'>
            <img
              src='../../../../logo-gold2.png'
              alt='logo'
              className='navbar-logo'
            />{" "}
            HADAF
          </Link>
        </h1>
        {/* <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-togglerIcon'></span>
        </button> */}
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <Search />
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
