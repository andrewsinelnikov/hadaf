import Navbar from "../global/Navbar";

interface IProps {
  children: React.ReactNode;
  navbarType?: number;
}

const UserLayout: React.FC<IProps> = ({ children, navbarType }: IProps) => {
  return (
    <>
      {navbarType === 0 && <Navbar />}
      {navbarType === 1 && <Navbar navbarType={1} />}
      <div className='container content'>{children}</div>
    </>
  );
};

export default UserLayout;
