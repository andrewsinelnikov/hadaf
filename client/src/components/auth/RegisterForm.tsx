import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../utils/hooks";
import { register } from "../../redux/actions/authAction";
import { InputChange, FormSubmit } from "../../utils/TypeScript";

const RegisterForm = () => {
  const initialState = { name: "", account: "", password: "", cf_password: "" };
  const [userRegister, setUserRegister] = useState(initialState);
  const { name, account, password, cf_password } = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

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
        <input
          type='text'
          className='form-control'
          name='name'
          id='name'
          value={name}
          onChange={handleChangeInput}
          placeholder='Full Name (up to 25 characters)'
        />
      </div>

      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          name='account'
          id='account'
          value={account}
          onChange={handleChangeInput}
          placeholder='Email or Mobile number'
        />
      </div>

      <div className='form-group'>
        <div className='pass'>
          <input
            type={typePass ? "text" : "password"}
            className='form-control'
            name='password'
            id='password'
            value={password}
            onChange={handleChangeInput}
            placeholder='Password (8 or more characters)'
          />
          <small onClick={(e) => setTypePass(!typePass)}>
            {/* {typePass ? "Hide" : "Show"} */}
            {typePass ? (
              <i className='fa-solid fa-eye-slash' />
            ) : (
              <i className='fa-solid fa-eye' />
            )}
          </small>
        </div>
      </div>

      <div className='form-group'>
        <div className='pass'>
          <input
            type={typeCfPass ? "text" : "password"}
            className='form-control'
            name='cf_password'
            id='cf_password'
            value={cf_password}
            onChange={handleChangeInput}
            placeholder='Confirm Password'
          />
          <small onClick={(e) => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? (
              <i className='fa-solid fa-eye-slash' />
            ) : (
              <i className='fa-solid fa-eye' />
            )}
          </small>
        </div>
      </div>

      <button
        type='submit'
        disabled={name && account && password && cf_password ? false : true}
        className='btn'>
        Join
      </button>
    </form>
  );
};

export default RegisterForm;
