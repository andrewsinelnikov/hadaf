import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  RootStore,
  InputChange,
  IUserProfile,
  FormSubmit,
} from "../../utils/TypeScript";
import { updateUser, resetPassword } from "../../redux/actions/profileAction";
import NotFound from "../global/NotFound";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const initState = {
    name: "",
    account: "",
    image: "",
    password: "",
    cf_password: "",
  };

  const [user, setUser] = useState<IUserProfile>(initState);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const { name, image, password, cf_password } = user;

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      setUser({ ...user, image: file });
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (image || name) dispatch(updateUser(image as Blob, name, auth));

    if (password && auth.access_token)
      dispatch(resetPassword(password, cf_password, auth.access_token));
  };

  if (!auth.user) return <NotFound />;

  return (
    <div className='profile-info'>
      {/* <form className='profile__info' onSubmit={handleSubmit}> */}
      <div className='info-img'>
        <div></div>
        <div></div>
        <img
          src={image ? URL.createObjectURL(image as Blob) : auth.user.image}
          alt='user'
        />
      </div>
      <div className='profile-info'>
        <Link
          to={`/profile/${auth.user._id}/edit`}
          className='btn profile-edit'>
          Edit profile
        </Link>
        <p className='info-name'>{auth.user.name}</p>
        {auth.user.usta ? (
          <p className='info-position'>{auth.user.usta}</p>
        ) : (
          <Link to={`/profile/${auth.user._id}/edit`} className='info-add'>
            Your Usta account
          </Link>
        )}
        {auth.user.bbook ? (
          <p className='info-location'>{auth.user.bbook}</p>
        ) : (
          <Link to={`/profile/${auth.user._id}/edit`} className='info-add'>
            Add Location
          </Link>
        )}
      </div>
      {/* <div className='form-group my-3'>
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
      </div> */}
      {/* {auth.user.type === "register" && (
        <>
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
        </>
      )} */}
      <div className='actions'>
        <button type='submit' className='btn btn-info w-100'>
          Update
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
