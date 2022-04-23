import React from "react";
import { Link, useLocation } from "react-router-dom";

import RegisterForm from "../components/auth/RegisterForm";
import NormalPageLayout from "../components/layouts/NormalPageLayout";

const Register = () => {
  const location = useLocation();

  return (
    <NormalPageLayout>
      <div className='auth_page'>
        <div className='auth_box'>
          <h3 className='text-uppercase text-center mb-4'>Register</h3>
          <RegisterForm />

          <p className='mt-2'>
            {`Already have an account? `}
            {/* <Link to={`/login${location.search}`} style={{ color: "crimson" }}> */}
            <Link to={`/login}`} style={{ color: "crimson" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </NormalPageLayout>
  );
};

export default Register;
