import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import AuthPageLayout from "../components/layouts/AuthPageLayout";
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
    <AuthPageLayout>
      <div className='auth_page'>

        <div className='auth_panel'>
          <div className='auth_panel_inner'>

            <Link to='/' className='auth_back'>
              <i className='fa-solid fa-arrow-left' />
              Back
            </Link>

            <div className='auth_header'>
              <div className='auth_logo'>H</div>
              <h1 className='auth_title'>Welcome back</h1>
              <p className='auth_subtitle'>Good to see you again. Let's keep moving.</p>
            </div>

            {sms ? <LoginSMS /> : <LoginPass />}

            <div className='auth_links'>
              <Link to='/forgot_password'>Forgot password?</Link>
              <button className='auth_mode_toggle' onClick={() => setSms(!sms)}>
                {sms ? "Use password" : "Use SMS"}
              </button>
            </div>

            <div className='auth_divider'><span>or</span></div>

            <LoginSocial />

            <p className='auth_footer_note'>
              No account?{" "}
              <Link to='/register'>Create one — it's free</Link>
            </p>

          </div>
        </div>

        <div className='auth_visual'>
          <div className='auth_visual_content'>
            <blockquote className='auth_quote'>
              "A goal without a plan<br />is just a wish."
            </blockquote>
            <p className='auth_quote_author'>— Antoine de Saint-Exupéry</p>
            <div className='auth_visual_ornament' />
          </div>
        </div>

      </div>
    </AuthPageLayout>
  );
};

export default Login;