import HomePageLayout from "../components/layouts/HomePageLayout";
import Countdown from "../components/global/Countdown";
import { endOfDay, endOfWeek, endOfSeason } from "../utils/FindEnd";

const Home = () => {
  return (
    <HomePageLayout>
      <div className='home-left'>
        <h1>life is going</h1>
      </div>
      <div className='home-right'>
        <p>The day ends in</p>
        <Countdown date={endOfDay()} />
        <p>
          What are you <br /> waiting for?
        </p>
      </div>
      {/* Today <Countdown date={endOfDay()} />
      Week <Countdown date={endOfWeek()} />
      Season <Countdown date={endOfSeason()} /> */}
    </HomePageLayout>
  );
};

export default Home;
