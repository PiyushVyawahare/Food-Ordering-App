import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useMatch } from "react-router-dom";

import "./App.css";

const App = () => {
  return (
    <>
      <div className='main'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default App;
