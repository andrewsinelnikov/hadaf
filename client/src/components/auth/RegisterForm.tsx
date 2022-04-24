import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authAction";
import { InputChange, FormSubmit } from "../../utils/TypeScript";

const RegisterForm = () => {
  const initialState = { name: "", account: "", password: "", cf_password: "" };
  const [userRegister, setUserRegister] = useState(initialState);
  const { name, account, password, cf_password } = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        {/* <label htmlFor='name' className='form-label'>
          Name
        </label> */}
        <input
          type='text'
          className='form-control'
          name='name'
          id='name'
          value={name}
          onChange={handleChangeInput}
          placeholder='Name (up to 20 characters)'
        />
      </div>

      <div className='form-group'>
        {/* <label htmlFor='account' className='form-label'>
          Email / Phone number
        </label> */}
        <input
          type='text'
          className='form-control'
          name='account'
          id='account'
          value={account}
          onChange={handleChangeInput}
          // placeholder='example@mail.com / +380441111111'
          placeholder='Email or Mobile number'
        />
      </div>

      <div className='form-group'>
        {/* <label htmlFor='password' className='form-label'>
          Password
        </label> */}
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
        {/* <label htmlFor='cf_password' className='form-label'>
          Confirm password
        </label> */}
        <div className='pass'>
          <input
            type={typePass ? "text" : "password"}
            className='form-control'
            name='cf_password'
            id='cf_password'
            value={cf_password}
            onChange={handleChangeInput}
            placeholder='Confirm password'
          />
          <small onClick={(e) => setTypeCfPass(!typeCfPass)}>
            {/* {typeCfPass ? "Hide" : "Show"} */}
            {typePass ? (
              <i className='fa-solid fa-eye-slash' />
            ) : (
              <i className='fa-solid fa-eye' />
            )}
          </small>
        </div>
      </div>

      <button type='submit' className='btn'>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
