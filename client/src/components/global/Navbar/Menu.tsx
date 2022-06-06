import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootStore } from "../../../utils/TypeScript";
import { useOnClickOutside } from "./hooks";

interface IProps {
  openSearch: boolean;
  setOpenSearch: (search: boolean) => void;
}
const Menu = ({ openSearch, setOpenSearch }: IProps) => {
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const node = useRef(null);
  useOnClickOutside(node, () => setOpen(false));

  const bfLoginLinks = [
    { label: "Join now", path: "/register" },
    { label: "Sign in", path: "/login" },
  ];

  const afLoginLinks = [
    { label: "Home", path: "/" },
    // { label: "CreateBlog", path: "/create_blog" },
  ];

  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;

  const isActive = (pn: string) => {
    if (pn === pathname) return "nav-active";
  };

  return (
    <ul className='navbar-nav'>
      {navLinks.map((link, index) => (
        <li key={index} className={`nav-item large ${isActive(link.path)}`}>
          <Link className='nav-link' to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}

      <li className='nav-item mobile'>
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => {
            setOpenSearch(!openSearch);
          }}
          style={{
            color: openSearch
              ? "var(--primary-color)"
              : "var(--lightdark-color)",
          }}>
          <i className='fa-solid fa-magnifying-glass fa-lg'></i>
        </button>
      </li>

      <li className='nav-item mobile'>
        <Link className='nav-link' to='/login'>
          <i className='fa-solid fa-arrow-right-to-bracket fa-lg'></i>
        </Link>
      </li>

      <li
        className='nav-item dropdown large'
        ref={node}
        onClick={() => setOpen(!open)}>
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
