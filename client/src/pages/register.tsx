import { Link, useLocation } from "react-router-dom";

import NormalPageLayout from "../components/layouts/NormalPageLayout";
import Brand from "../components/global/Navbar/Brand";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  const location = useLocation();

  return (
    <NormalPageLayout>
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
    </NormalPageLayout>
  );
};

export default Register;
