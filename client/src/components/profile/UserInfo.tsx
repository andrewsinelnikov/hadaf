import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootStore, InputChange, IUserProfile } from "../../utils/TypeScript";
import NotFound from "../global/NotFound";

const UserInfo = () => {
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const initState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
  };

  const [user, setUser] = useState<IUserProfile>(initState);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const { name, avatar, password, cf_password } = user;

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      setUser({ ...user, avatar: file });
    }
  };

  if (!auth.user) return <NotFound />;

  return (
    <form className='profile__info'>
      <div className='info_avatar'>
        <img
          src={avatar ? URL.createObjectURL(avatar as Blob) : auth.user.avatar}
          alt='user'
        />
        <span>
          <i className='fas fa-camera' />
          <p>Change</p>
          <input
            type='file'
            accept='image/*'
            name='file'
            id='file_up'
            onChange={handleChangeFile}
          />
        </span>
      </div>

      <div className='form-group my-3'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          defaultValue={auth.user.name}
          onChange={handleChangeInput}
        />
      </div>

      <div className='form-group my-3'>
        <label htmlFor='account'>Account</label>
        <input
          type='text'
          id='account'
          name='account'
          defaultValue={auth.user.account}
          onChange={handleChangeInput}
          disabled={true}
        />
      </div>

      {auth.user.type !== "register" && (
        <small className='text-danger'>
          Quick login account with {auth.user.type} can't use this function
        </small>
      )}

      <div className='form-group my-3'>
        <label htmlFor='password'>Password</label>
        <div className='pass'>
          <input
            type={typePass ? "text" : "password"}
            id='password'
            name='password'
            value={password}
            onChange={handleChangeInput}
            disabled={auth.user.type !== "register"}
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <div className='form-group my-3'>
        <label htmlFor='cf_password'>Confirm Password</label>
        <div className='pass'>
          <input
            type={typeCfPass ? "text" : "password"}
            id='cf_password'
            name='cf_password'
            value={cf_password}
            onChange={handleChangeInput}
            disabled={auth.user.type !== "register"}
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button type='submit' className='btn btn-info w-100'>
        Update
      </button>
    </form>
  );
};

export default UserInfo;
