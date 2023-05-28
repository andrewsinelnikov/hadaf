import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { FormSubmit, IUserProfile, InputChange } from "../../utils/TypeScript";

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

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className='edit-box'>
      <h3 className='edit-title'>Edit profile</h3>
      <form className='edit-info' onSubmit={handleSubmit}></form>
    </div>
  );
};

export default UserEdit;
