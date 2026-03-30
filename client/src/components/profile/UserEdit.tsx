import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { FormSubmit, IUserProfile, InputChange } from "../../types";
import { updateUser, resetPassword } from "../../redux/actions/profileAction";
import NotFound from "../global/NotFound";

const UserEdit = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const initState = {
    name: "",
    account: "",
    image: "",
    password: "",
    cf_password: "",
    usta: "",
    bbook: "",
  };

  const [user, setUser] = useState<IUserProfile>(initState);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const { name, image, password, cf_password, usta, bbook } = user;

  useEffect(() => {
    if (auth.user) {
      setUser({
        ...user,
        name: auth.user.name,
        password: auth.user.password,
        usta: auth.user.usta,
        bbook: auth.user.bbook,
      });
    }
  }, [auth.user]);

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      setUser({ ...user, image: file });
    }
  };

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (image || name || usta || bbook)
      dispatch(updateUser(image as Blob, name, usta, bbook, auth));

      if (password && auth.access_token)
      dispatch(resetPassword(password, cf_password));  
    navigate(-1);
  };

  if (!auth.user) return <NotFound />;

  return (
    <div className='edit-box'>
      <Link to={`/profile/${auth.user._id}`}>Back to your profile</Link>
      <h3 className='edit-title'>Edit profile</h3>
      <form className='edit-info' onSubmit={handleSubmit}>
        <div className='edit-img'>
          <div className='info-img'>
            <div></div>
            <div></div>
            <img
              src={image ? URL.createObjectURL(image as Blob) : auth.user.image}
              alt='user'
            />
          </div>
          <div className='img-change'>
            <label className='btn btn-md btn-dark' htmlFor='file_up'>
              Change photo
            </label>
            <input
              type='file'
              accept='image/*'
              name='file'
              id='file_up'
              onChange={handleChangeFile}
            />
          </div>
        </div>

        <div className='edit-data'>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='name'
              id='name'
              value={name}
              onChange={handleChangeInput}
              placeholder='Full Name'
            />
            <small style={{ fontWeight: "bold" }}>
              <span
                style={{
                  color: `${
                    name.length > 25
                      ? "var(--error-color)"
                      : "var(--done-color)"
                  }`,
                }}>
                {name.length}
              </span>{" "}
              / 25
            </small>
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='account'
              id='account'
              value={auth.user.account}
              onChange={handleChangeInput}
              disabled={true}
              placeholder='Email or Mobile number'
            />
          </div>

          {auth.user.type === "register" && (
            <>
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
            </>
          )}

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='usta'
              id='usta'
              value={usta}
              onChange={handleChangeInput}
              placeholder='Usta account'
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='bbook'
              id='bbook'
              value={bbook}
              onChange={handleChangeInput}
              placeholder='Bbook account'
            />
          </div>

          <button type='submit' className='btn btn-success'>
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
