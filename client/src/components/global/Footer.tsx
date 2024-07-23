import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='footer container'>
      <div className='footer-wrapper'>
        <ul className='footer-rights'>
          <li>&copy; {new Date().getFullYear()} Hadaf</li>
        </ul>
        <div className='footer-info'>
          <ul className='footer-left'>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/privacy'>Privacy</Link>
            </li>
            <li>
              <Link to='/terms'>Terms</Link>
            </li>
            <li>
              <Link to='/help'>Help</Link>
            </li>
          </ul>
          <form action='' className='footer-language'>
            <select id='language' name='language'>
              <option value='english'>English</option>
            </select>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
