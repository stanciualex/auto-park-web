import React from 'react';
import {BrowserRouter} from "react-router-dom";

import './assets/css/style.css';
import Router from "./containers/Router/Router";

const App = () => {
  return (
      <div className="app-container">
          <BrowserRouter>
              <Router/>
          </BrowserRouter>
      </div>
  );
};

export default App;
