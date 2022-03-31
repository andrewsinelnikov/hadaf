import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageRender from "./PageRender";

const App = () => {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<PageRender />} />
            <Route path=':page' element={<PageRender />} />
            <Route path=':page/:slug' element={<PageRender />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
