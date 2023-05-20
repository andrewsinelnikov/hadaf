import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IParams, RootStore } from "../../utils/TypeScript";
import Layout from "../../components/layouts/Layout";
import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";
import UserPosts from "../../components/profile/UserPosts";

const Profile = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <Layout navbarType={0}>
      <div>{auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}</div>
      <div>
        <UserPosts />
      </div>
    </Layout>
  );
};

export default Profile;
