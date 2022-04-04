import { useState } from "react";

const LoginSMS = () => {
  const [phone, setPhone] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group mb-3'>
        <label htmlFor='phone' className='form-label'>
          Phone number
        </label>
        <input
          type='text'
          className='form-control'
          name='phone'
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='+380321231111'
        />
      </div>

      <button
        type='submit'
        className='btn btn-dark w-100 mt-1'
        disabled={phone ? false : true}>
        Login
      </button>
    </form>
  );
};

export default LoginSMS;
