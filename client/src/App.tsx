import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
// import { useDispatch } from "react-redux";

import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { RootState } from "./redux/store";
import { refreshToken } from "./redux/actions/authAction";
import { getCurrentGoals, getGoals } from "./redux/actions/goalAction";
import { getPlansByGoal } from "./redux/actions/planAction";

import PageRender from "./PageRender";
import ScrollToTop from "./components/global/ScrollToTop";
import { Alert } from "./components/alert/Alert";
import { IParams } from "./utils/TypeScript";

const App = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;
  const { auth } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    if (auth.access_token) {
      dispatch(getCurrentGoals(auth.access_token));
      // dispatch(getGoals(auth.access_token));
      // if (slug) dispatch(getPlansByGoal(slug, auth.access_token));
    }
  }, [auth.access_token, dispatch]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Alert />
        <Routes>
          <Route path='/' element={<PageRender />} />
          <Route path=':page' element={<PageRender />} />
          <Route path=':page/:slug' element={<PageRender />} />
          <Route path=':page/:slug/:action' element={<PageRender />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
