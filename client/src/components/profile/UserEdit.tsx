import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { FormSubmit, IUserProfile, InputChange } from "../../utils/TypeScript";
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
    navigate(-1);
  };

  if (!auth.user) return <NotFound />;

  return (
    <div className='edit-box'>
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
              defaultValue={auth.user.name}
              onChange={handleChangeInput}
              placeholder='Full Name (up to 20 characters)'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
