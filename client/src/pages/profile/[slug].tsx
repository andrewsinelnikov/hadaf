import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IParams, RootStore } from "../../utils/TypeScript";
import UserInfo from "../../components/profile/UserInfo.tsx";
import OtherInfo from "../../components/profile/OtherInfo";
import UserPosts from "../../components/profile/UserPosts.tsx";

const Profile = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <div>
      <div>{auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}</div>
      <div>
        <UserPosts />
      </div>
    </div>
  );
};

export default Profile;
