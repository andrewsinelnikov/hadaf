import Navbar from "../global/Navbar";

interface IProps {
  children: React.ReactNode;
}

const HomePageLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <>
      <Navbar navbarType={1} />
      <div className='home'>{children}</div>
    </>
  );
};

export default HomePageLayout;
