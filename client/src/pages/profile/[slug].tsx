import { useParams } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useAppSelector } from "../../utils/hooks";
import { IParams } from "../../utils/TypeScript";
import UserLayout from "../../components/layouts/UserLayout";
import Layout from "../../components/layouts/Layout";
import UserInfo from "../../components/profile/UserInfo";
import UserEdit from "../../components/profile/UserEdit";
import OtherInfo from "../../components/profile/OtherInfo";
import UserPosts from "../../components/profile/UserPosts";

const Profile = () => {
  const { slug, action }: IParams = useParams<keyof IParams>() as IParams;
  const { auth } = useAppSelector((state: RootState) => state);

  if (auth.user?._id === slug && action === "edit")
    return (
      <Layout navbarType={1}>
        <div className='profile-edit'>
          <UserEdit />
        </div>
      </Layout>
    );

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        {auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}
        <div className='profile-content'>
          <UserPosts />
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
