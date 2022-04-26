import { useState } from "react";

const LoginSMS = () => {
  const [phone, setPhone] = useState("");

  return (
    <form>
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
