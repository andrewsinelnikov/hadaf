import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../utils/hooks";
import { register } from "../../redux/actions/authAction";
import { InputChange, FormSubmit } from "../../types";

const RegisterForm = () => {
  const initialState = { name: "", account: "", password: "", cf_password: "" };
  const [userRegister, setUserRegister] = useState(initialState);
  const { name, account, password, cf_password } = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='form-label' htmlFor='name'>Full name</label>
        <input
          type='text'
          className='form-control'
          name='name'
          id='name'
          value={name}
          onChange={handleChangeInput}
          placeholder='Your name'
          autoComplete='name'
          maxLength={25}
        />
      </div>

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
            placeholder='8 or more characters'
            autoComplete='new-password'
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass
              ? <i className='fa-solid fa-eye-slash' />
              : <i className='fa-solid fa-eye' />
            }
          </small>
        </div>
      </div>

      <div className='form-group'>
        <label className='form-label' htmlFor='cf_password'>Confirm password</label>
        <div className='pass'>
          <input
            type={typeCfPass ? "text" : "password"}
            className='form-control'
            name='cf_password'
            id='cf_password'
            value={cf_password}
            onChange={handleChangeInput}
            placeholder='••••••••'
            autoComplete='new-password'
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass
              ? <i className='fa-solid fa-eye-slash' />
              : <i className='fa-solid fa-eye' />
            }
          </small>
        </div>
      </div>

      <button
        type='submit'
        disabled={!name || !account || !password || !cf_password}
        className='btn'>
        Create account
      </button>
    </form>
  );
};

export default RegisterForm;