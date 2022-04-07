import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../utils/TypeScript";

import LoginPass from "../components/auth/LoginPass";
import LoginSMS from "../components/auth/LoginSMS";

const Login = () => {
  const [sms, setSms] = useState(false);
  const navigate = useNavigate();

  const { auth } = useSelector((state: RootStore) => state);

  useEffect(() => {
    if (auth.access_token) navigate("/");
  }, [auth.access_token, navigate]);

  return (
    <div className='auth_page'>
      <div className='auth_box'>
        <h3 className='text-uppercase text-center mb-4'>Login</h3>

        {sms ? <LoginSMS /> : <LoginPass />}

        <small className='row my-2 test-primary'>
          <span className='col-6'>
            <Link to='/forgot_password'>Forgot password</Link>
          </span>

          <span className='col-6 text-end' onClick={(e) => setSms(!sms)}>
            {sms ? "Sign in with password" : "Sign in with SMS"}
          </span>
        </small>

        <p>
          {`Don't have an account? `}
          <Link to={`/register`} style={{ color: "crimson" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
