import ExceptionalPageLayout from "../components/layouts/ExceptionalPageLayout";
import Countdown from "../components/global/Countdown";
import { endOfDay, endOfWeek, endOfSeason } from "../utils/FindEnd";

const Home = () => {
  return (
    <ExceptionalPageLayout bg='#0f1f2f'>
      <div className='home-wrapper'>
        <h2>Home page</h2>
        Today <Countdown date={endOfDay()} />
        Week <Countdown date={endOfWeek()} />
        Season <Countdown date={endOfSeason()} />
      </div>
    </ExceptionalPageLayout>
  );
};

export default Home;
