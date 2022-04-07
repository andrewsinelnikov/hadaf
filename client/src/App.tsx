import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageRender from "./PageRender";
import { Alert } from "./components/alert/Alert";

const App = () => {
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
