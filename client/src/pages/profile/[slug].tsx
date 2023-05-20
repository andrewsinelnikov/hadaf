import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IParams, RootStore } from "../../utils/TypeScript";
import UserLayout from "../../components/layouts/UserLayout";
import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";
import UserPosts from "../../components/profile/UserPosts";

const Profile = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <div className='profile-info'>
          {auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}
        </div>
        <div>
          <UserPosts />
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
