import { Link } from "react-router-dom";

import Layout from "../components/layouts/Layout";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <Layout navbarType={0}>
      <div className='auth_page'>
        <div className='auth_box'>
          <div className='auth_header'>
            <h3 className='auth_title'>Start your journey</h3>
            <p className='auth_subtitle'>
              Already have an account?{" "}
              <Link to='/login'>Sign in</Link>
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;