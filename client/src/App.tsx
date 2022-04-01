import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageRender from "./PageRender";
import Navbar from "./components/global/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
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
