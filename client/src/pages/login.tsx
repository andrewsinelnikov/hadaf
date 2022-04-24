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

          <small className='auth_forgot'>
            <span>
              <Link to='/forgot_password'>Forgot password</Link>
            </span>

            <span onClick={(e) => setSms(!sms)}>
              {sms ? "Sign in with password" : "Sign in with SMS"}
            </span>
          </small>

          <p>
            {`Don't have an account? `}
            <Link
              to={`/register`}
              style={{ fontWeight: "500", textTransform: "uppercase" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </NormalPageLayout>
  );
};

export default Login;
