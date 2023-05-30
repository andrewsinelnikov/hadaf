import { useState } from "react";

import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { InputChange, IUserProfile, FormSubmit } from "../../utils/TypeScript";
import { updateUser, resetPassword } from "../../redux/actions/profileAction";
import NotFound from "../global/NotFound";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

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

  // const handleSubmit = (e: FormSubmit) => {
  //   e.preventDefault();
  //   if (image || name) dispatch(updateUser(image as Blob, name, auth));

  //   if (password && auth.access_token)
  //     dispatch(resetPassword(password, cf_password, auth.access_token));
  // };

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
      <div className='info-data'>
        <div>
          <p className='data-name'>{auth.user.name}</p>
          <p className='data-links'>
            <a href={auth.user.usta} target='_blank' rel='noreferrer'>
              Usta
            </a>
            <span></span>
            <a href={auth.user.bbook} target='_blank' rel='noreferrer'>
              BBook
            </a>
          </p>
        </div>
        <div className='data-edit'>
          <Link
            to={`/profile/${auth.user._id}/edit`}
            className='btn btn-md btn-dark'>
            Edit
          </Link>
        </div>
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
      <div className='info-actions'>
        <Link to='/goals'>
          {/* <Link to={`/profile/${auth.user._id}/goals`}> */}
          <div className='step'>
            <p className='title'>Set goals</p>
          </div>
        </Link>
        <Link to='/plans'>
          {/* <Link to={`/profile/${auth.user._id}/plans`}> */}
          <div className='step'>
            <p className='title'>Make plans</p>
          </div>
        </Link>
        <Link to='/actions'>
          {/* <Link to={`/profile/${auth.user._id}/actions`}> */}
          <div className='step'>
            <p className='title'>Take actions</p>
          </div>
        </Link>
      </div>
      <div className='info-tools'>
        <Link to='/journal'>
          {/* <i className='fa-solid fa-file-pen fa-xl' /> */}
          Journal
        </Link>
        <Link to='/friends'>
          {/* <i className='fa-solid fa-users fa-xl' /> */}
          Friends
        </Link>
        <Link to='/history'>
          {/* <i className='fa-solid fa-book fa-xl' /> */}
          History
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
