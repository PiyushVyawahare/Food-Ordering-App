import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useMatch } from "react-router-dom";

import "./App.css";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import store from "./utils/store";

const App = () => {
  const [user, setUser] = useState({
    name: "Piyush Vyawahare",
    email: "piyush.vyawahare@gmail.com",
  });
  return (
    <Provider store={store}>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <div className='main'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export default App;
