import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import Layout from "../components/layouts/Layout";
import LoginPass from "../components/auth/LoginPass";
import LoginSMS from "../components/auth/LoginSMS";
import LoginSocial from "../components/auth/LoginSocial";

const Login = () => {
  const [sms, setSms] = useState(false);

  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token) navigate("/");
  }, [auth.access_token, navigate]);

  return (
    <Layout navbarType={0}>
      <div className='auth_page'>
        <div className='auth_box'>
          <div className='auth_header'>
            <h3 className='auth_title'>Welcome back</h3>
            <p className='auth_subtitle'>
              New here?{" "}
              <Link to='/register'>Create an account</Link>
            </p>
          </div>

          {sms ? <LoginSMS /> : <LoginPass />}

          <div className='auth_links'>
            <Link to='/forgot_password'>Forgot password?</Link>
            <button
              className='auth_mode_toggle'
              onClick={() => setSms(!sms)}>
              {sms ? "Use password instead" : "Sign in with SMS"}
            </button>
          </div>

          <div className='auth_divider'>
            <span>or</span>
          </div>

          <LoginSocial />
        </div>
      </div>
    </Layout>
  );
};

export default Login;