import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormSubmit } from "../../utils/TypeScript";

const UserEdit = () => {
  let navigate = useNavigate();

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className='edit-box'>
      <h3 className='edit-title'>Edit profile</h3>
      <form className='edit-info' onSubmit={handleSubmit}></form>
    </div>
  );
};

export default UserEdit;
