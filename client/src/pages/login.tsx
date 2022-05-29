import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../utils/TypeScript";

import AuthPageLayout from "../components/layouts/AuthPageLayout";
import Brand from "../components/global/Navbar/Brand";
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
    <AuthPageLayout>
      <div className='auth_page'>
        <Brand />
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
    </AuthPageLayout>
  );
};

export default Login;
