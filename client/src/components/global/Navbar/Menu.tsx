import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const bfLoginLinks = [
    { label: "Join now", path: "/register" },
    { label: "Sign in", path: "/login" },
  ];
  return (
    <ul className='navbar-nav'>
      {bfLoginLinks.map((link, index) => (
        <li key={index} className='nav-item'>
          <Link className='nav-link' to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}

      <li className='nav-item dropdown'>
        <span
          className='nav-link dropdown-toggle'
          id='navbarDropdown'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'>
          UserName
        </span>

        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
          <li>
            <Link className='dropdown-item' to='/profile'>
              Profile
            </Link>
          </li>
          <li>
            <hr className='dropdown-divider' />
          </li>
          <li>
            <Link className='dropdown-item' to='/'>
              Sign out
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Menu;
