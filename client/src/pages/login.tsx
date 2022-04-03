import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import LoginPass from "../components/auth/LoginPass";

const Login = () => {
  const [sms, setSms] = useState(false);

  return (
    <div className='auth_page'>
      <div className='auth_box'>
        <h3 className='text-uppercase text-center mb-4'>Login</h3>

        <LoginPass />

        <small className='row my-2 test-primary'>
          <span className='col-6'>
            <Link to='/forgot_password'>Forgot password</Link>
          </span>

          <span className='col-6 text-end' onClick={(e) => setSms(!sms)}>
            {sms ? "Sign in with password" : "Sign in with SMS"}
          </span>
        </small>

        <p>
          Don't have an account?
          <Link to={`/register${location.search}`} style={{ color: "crimson" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
