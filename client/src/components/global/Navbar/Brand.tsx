import { Link } from "react-router-dom";

const Brand = () => {
  return (
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
  );
};

export default Brand;
