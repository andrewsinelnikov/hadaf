import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootStore } from "../../../utils/TypeScript";
import { useOnClickOutside } from "./hooks";
import { logout } from "../../../redux/actions/authAction";

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

  // const isAuth = () => {
  //   if (pathname === "/login" || pathname === "/register") return "navbar-auth";
  //   return "";
  // };

  const isHidden = (pn: string) => {
    if (pn === pathname) return "nav-hidden";
  };

  const handleLogout = () => {
    if (!auth.access_token) return;

    dispatch(logout(auth.access_token));
  };

  return (
    <ul className='navbar-nav'>
      {/* <ul className={`navbar-nav ${isAuth()}`}> */}
      {navLinks.map((link, index) => (
        <li key={index} className={`nav-item large ${isHidden(link.path)}`}>
          {/* <li key={index} className={`nav-item large ${isActive(link.path)}`}> */}
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

      {(auth.user && (
        <li
          className='nav-item dropdown'
          ref={node}
          onClick={() => setOpen(!open)}>
          <span
            className='dropdown-toggle'
            id='navbarDropdown'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'>
            <img src={auth.user.avatar} alt='user' className='nav-user' />
            <i className='fa fa-caret-down' />
          </span>

          {open && (
            <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <li>
                <Link
                  className='dropdown-item'
                  to={`/profile/${auth.user._id}`}>
                  Profile
                </Link>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <Link className='dropdown-item' to='/' onClick={handleLogout}>
                  Sign out
                </Link>
              </li>
            </ul>
          )}
        </li>
      )) || (
        <li className='nav-item mobile'>
          <Link className='mobile-link' to='/login'>
            <i className='fa-regular fa-circle-user fa-lg'></i>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Menu;
