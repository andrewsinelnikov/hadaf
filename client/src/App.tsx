import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

import PageRender from "./PageRender";
import { Alert } from "./components/alert/Alert";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Alert />
        <Routes>
          <Route path='/' element={<PageRender />} />
          <Route path=':page' element={<PageRender />} />
          <Route path=':page/:slug' element={<PageRender />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
