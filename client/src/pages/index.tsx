import HomePageLayout from "../components/layouts/HomePageLayout";
import Countdown from "../components/global/Countdown";
import { endOfDay, endOfWeek, endOfSeason } from "../utils/FindEnd";

const Home = () => {
  return (
    <HomePageLayout>
      <div className='home-left'>1jjjjjjjjjjjj</div>
      <div className='home-right'></div>
      {/* Today <Countdown date={endOfDay()} />
      Week <Countdown date={endOfWeek()} />
      Season <Countdown date={endOfSeason()} /> */}
    </HomePageLayout>
  );
};

export default Home;
