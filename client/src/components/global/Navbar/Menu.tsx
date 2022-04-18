import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  openSearch: boolean;
  setOpenSearch: (search: boolean) => void;
}
const Menu = ({ openSearch, setOpenSearch }: IProps) => {
  const [open, setOpen] = useState(false);

  const bfLoginLinks = [
    { label: "Join now", path: "/register" },
    { label: "Sign in", path: "/login" },
  ];

  return (
    <ul className='navbar-nav'>
      {bfLoginLinks.map((link, index) => (
        <li key={index} className='nav-item large'>
          <Link className='nav-link' to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}

      <li className='nav-item mobile'>
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setOpenSearch(!openSearch)}>
          <i className='fa-solid fa-magnifying-glass fa-lg'></i>
        </button>
      </li>

      <li className='nav-item mobile'>
        <Link className='nav-link' to='/login'>
          <i className='fa-solid fa-arrow-right-to-bracket fa-lg'></i>
        </Link>
      </li>

      <li className='nav-item dropdown large' onClick={() => setOpen(!open)}>
        <span
          className='nav-link dropdown-toggle'
          id='navbarDropdown'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'>
          UserName <i className='fa fa-caret-down fa-xs' />
        </span>

        {open && (
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
        )}
      </li>
    </ul>
  );
};

export default Menu;
