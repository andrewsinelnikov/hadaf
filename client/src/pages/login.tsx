import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../utils/TypeScript";

import NormalPageLayout from "../components/layouts/NormalPageLayout";
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
    <NormalPageLayout>
      <div className='auth_page'>
        <div className='auth_box'>
          <h3 className='auth_title'>Login</h3>

          {sms ? <LoginSMS /> : <LoginPass />}

          <small className='auth_forgot' style={{ cursor: "pointer" }}>
            <span>
              <Link to='/forgot_password'>Forgot password</Link>
            </span>

            <span onClick={(e) => setSms(!sms)}>
              {sms ? "Sign in with password" : "Sign in with SMS"}
            </span>
          </small>

          <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
            {`Don't have an account? `}
            <Link
              to={`/register`}
              style={{ fontWeight: "500", textTransform: "uppercase" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <svg height='240' width='240'>
        <line className='loader-pointer' x1='120' y1='120' x2='120' y2='97' />
        <line className='loader-line' x1='120' y1='120' x2='135' y2='120' />
        <circle className='loader-circle' cx='120' cy='120' r='30' />
        <circle className='loader-center' cx='120' cy='120' r='5' />
      </svg>
    </NormalPageLayout>
  );
};

export default Login;
