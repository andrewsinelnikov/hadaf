import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import Layout from "../components/layouts/Layout";
import LoginPass from "../components/auth/LoginPass";
import LoginSMS from "../components/auth/LoginSMS";
import LoginSocial from "../components/auth/LoginSocial";

const Login = () => {
  const [sms, setSms] = useState(false);
  const navigate = useNavigate();

  const { auth } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    if (auth.access_token) navigate("/actions");
  }, [auth.access_token, navigate]);

  return (
    <Layout navbarType={0}>
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

          <div className='auth_divider'>
            <span>or</span>
          </div>
          <LoginSocial />

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
    </Layout>
  );
};

export default Login;
