import { Link } from "react-router-dom";

import AuthPageLayout from "../components/layouts/AuthPageLayout";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
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
              <h1 className='auth_title'>Start your journey</h1>
              <p className='auth_subtitle'>3 months. 3 goals. Make them count.</p>
            </div>

            <RegisterForm />

            <p className='auth_footer_note'>
              Already have an account?{" "}
              <Link to='/login'>Sign in</Link>
            </p>

          </div>
        </div>

        <div className='auth_visual'>
          <div className='auth_visual_content'>
            <div className='auth_stats'>
              <div className='auth_stat'>
                <span className='auth_stat_num'>90</span>
                <span className='auth_stat_label'>Days per season</span>
              </div>
              <div className='auth_stat_divider' />
              <div className='auth_stat'>
                <span className='auth_stat_num'>3</span>
                <span className='auth_stat_label'>Goals max</span>
              </div>
              <div className='auth_stat_divider' />
              <div className='auth_stat'>
                <span className='auth_stat_num'>1</span>
                <span className='auth_stat_label'>Life to live</span>
              </div>
            </div>
            <p className='auth_visual_tagline'>
              Time doesn't wait.<br />Neither should you.
            </p>
            <div className='auth_visual_ornament' />
          </div>
        </div>

      </div>
    </AuthPageLayout>
  );
};

export default Register;