import { Link } from "react-router-dom";
// import { Link, useLocation } from "react-router-dom";

import Layout from "../components/layouts/Layout";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  // const location = useLocation();

  return (
    <Layout navbarType={0}>
      <div className='auth_page'>
        <div className='auth_box'>
          <h3 className='auth_title'>Register</h3>
          <RegisterForm />

          <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
            {`Have an account? `}
            {/* <Link to={`/login${location.search}`} style={{ color: "crimson" }}> */}
            <Link
              to={`/login`}
              style={{ fontWeight: "500", textTransform: "uppercase" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
