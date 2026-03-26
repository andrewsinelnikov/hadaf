import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import HomePageLayout from "../components/layouts/HomePageLayout";
import Countdown from "../components/global/Countdown";
import { endOfDay } from "../utils/FindEnd";
import { wasters } from "../data";
import { randomNum } from "../utils/randomNum";

const Home = () => {
  const navigate = useNavigate();

  const { auth, goals } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    if (auth.access_token) {
      if (goals.length > 0) {
        navigate("/actions");
      } else {
        navigate("/goals");
      }
    }
  }, [auth.access_token, goals, navigate]);

  return (
    <HomePageLayout>
      <div className='home-left'>
        <h1>life<br />is<br />going</h1>
        <p className='home-tagline'>Your time. Your goals. Your result.</p>
      </div>
      <div className='home-right'>
        <p className='home-eyebrow'>The day ends in</p>
        <div className='home-countdown'>
          <Countdown date={endOfDay()} showLabels={true} />
        </div>
        <p className='home-question'>
          What are you<br />waiting for?
        </p>
        <div className='home-actions'>
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
        </div>
      </div>
    </HomePageLayout>
  );
};

export default Home;