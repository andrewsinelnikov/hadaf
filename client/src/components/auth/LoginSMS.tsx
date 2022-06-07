import { useState } from "react";
import { useDispatch } from "react-redux";

import { FormSubmit } from "../../utils/TypeScript";
// import { loginSMS } from "../../redux/actions/authAction";

const LoginSMS = () => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    // dispatch(loginSMS(phone));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        {/* <label htmlFor='phone' className='form-label'>
          Phone number
        </label> */}
        <input
          type='text'
          className='form-control'
          name='phone'
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Mobile Number (+012345678912)'
        />
      </div>

      <button type='submit' className='btn' disabled={phone ? false : true}>
        Sign in
      </button>
    </form>
  );
};

export default LoginSMS;
