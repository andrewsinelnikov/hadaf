import { Link } from "react-router-dom";

import HomePageLayout from "../components/layouts/HomePageLayout";
import Countdown from "../components/global/Countdown";
import { endOfDay } from "../utils/FindEnd";
import { wasters } from "../data";
import { randomNum } from "../utils/randomNum";

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
        <p>
          <a
            href={wasters[randomNum(wasters)]}
            target='_blank'
            rel='noreferrer'
            className='btn btn-md btn-dark'>
            I'm lazy
          </a>
          <Link to='/login' className='btn btn-md btn-success'>
            Start now
          </Link>
        </p>
      </div>
      {/* Today <Countdown date={endOfDay()} />
      Week <Countdown date={endOfWeek()} />
      Season <Countdown date={endOfSeason()} /> */}
    </HomePageLayout>
  );
};

export default Home;
