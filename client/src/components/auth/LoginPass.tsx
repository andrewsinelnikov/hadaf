import { useState } from "react";

import { useAppDispatch } from "../../utils/hooks";
import { login } from "../../redux/actions/authAction";
import { InputChange, FormSubmit } from "../../types";


const LoginPass = () => {
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialState);
  const { account, password } = userLogin;
  const [typePass, setTypePass] = useState(false);

  const dispatch = useAppDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(login(userLogin));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='form-label' htmlFor='account'>Email or phone</label>
        <input
          type='text'
          className='form-control'
          name='account'
          id='account'
          value={account}
          onChange={handleChangeInput}
          placeholder='you@example.com'
          autoComplete='username'
        />
      </div>

      <div className='form-group'>
        <label className='form-label' htmlFor='password'>Password</label>
        <div className='pass'>
          <input
            type={typePass ? "text" : "password"}
            className='form-control'
            name='password'
            id='password'
            value={password}
            onChange={handleChangeInput}
            placeholder='••••••••'
            autoComplete='current-password'
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass
              ? <i className='fa-solid fa-eye-slash' />
              : <i className='fa-solid fa-eye' />
            }
          </small>
        </div>
      </div>

      <button
        type='submit'
        className='btn'
        disabled={!account || !password}>
        Sign in
      </button>
    </form>
  );
};

export default LoginPass;