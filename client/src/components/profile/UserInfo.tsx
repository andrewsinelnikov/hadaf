import { Link, useLocation } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useAppSelector } from "../../utils/hooks";
import NotFound from "../global/NotFound";

const UserInfo = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const { pathname } = useLocation();

  const actions = [
    { label: "Set goals", path: "/goals" },
    { label: "Make plans", path: "/plans" },
    { label: "Take actions", path: "/actions" },
  ];

  const tools = [
    {
      label: "Journal",
      path: "/journal",
      image: "<i className='fa-solid fa-file-pen fa-xl' />",
    },
    {
      label: "Friends",
      path: "/friends",
      image: "<i className='fa-solid fa-users fa-xl' />",
    },
    {
      label: "History",
      path: "/history",
      image: "<i className='fa-solid fa-book fa-xl' />",
    },
  ];

  const isActiveAction = (pn: string) => {
    if (pn === pathname) return "action-active";
  };

  const isActiveTool = (pn: string) => {
    if (pn === pathname) return "tool-active";
  };

  if (!auth.user) return <NotFound />;

  return (
    <div className='profile-info'>
      <div className='info-img'>
        <div></div>
        <div></div>
        <img
          src={auth.user.image}
          // src={image ? URL.createObjectURL(image as Blob) : auth.user.image}
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
      <div className='info-actions'>
        {actions.map((action, index) => (
          <Link
            to={action.path}
            key={index}
            className={`${isActiveAction(action.path)}`}>
            <div className='step'>
              <p className='title'>{action.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className='info-tools'>
        {tools.map((tool, index) => (
          <Link
            to={tool.path}
            key={index}
            className={`${isActiveTool(tool.path)}`}>
            {tool.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
