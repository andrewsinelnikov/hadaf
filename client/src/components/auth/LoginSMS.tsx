import { useState } from "react";
import { useDispatch } from "react-redux";

import { FormSubmit } from "../../utils/TypeScript";
import { loginSMS } from "../../redux/actions/authAction";

const LoginSMS = () => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(loginSMS(phone));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='form-label' htmlFor='phone'>Phone number</label>
        <input
          type='tel'
          className='form-control'
          name='phone'
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='+1 234 567 8900'
          autoComplete='tel'
        />
      </div>

      <button type='submit' className='btn' disabled={!phone}>
        Send code
      </button>
    </form>
  );
};

export default LoginSMS;