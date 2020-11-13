import React from 'react';
import {BrowserRouter} from "react-router-dom";

import './assets/css/style.css';
import Header from "./containers/Header/Header";
import Router from "./containers/Router/Router";
import Footer from "./containers/Footer/Footer";

const App = () => {
  return (
      <div className="app-container">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <BrowserRouter>
              <Header/>
              <Router/>
              <Footer/>
          </BrowserRouter>
      </div>
  );
};

export default App;
