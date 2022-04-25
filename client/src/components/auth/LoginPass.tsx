import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authAction";
import { InputChange, FormSubmit } from "../../utils/TypeScript";

const LoginPass = () => {
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialState);
  const { account, password } = userLogin;
  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();

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
        <input
          type='text'
          className='form-control'
          name='account'
          id='account'
          value={account}
          onChange={handleChangeInput}
          placeholder='Email / Phone number'
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
            placeholder='Password'
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

      <button
        type='submit'
        className='btn'
        disabled={account && password ? false : true}>
        Login
      </button>
    </form>
  );
};

export default LoginPass;
