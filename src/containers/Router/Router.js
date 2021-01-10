import React from 'react';
import {
    BrowserRouter, Redirect,
    Route,
} from 'react-router-dom';
import HomePage from "../../pages/home/HomePage";
import CarsPage from "../../pages/cars/CarsPage";
import UsersPage from "../../pages/users/UsersPage";
import AdminRequests from "../../containers/AdminRequests/AdminRequests.js";
import ProfilePage from "../../pages/profile/ProfilePage";

import LoginPage from "../../pages/login/LoginPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {withRouter, Switch} from "react-router";
import {connect} from "react-redux";

const AuthenticationWrapper = withRouter(({ children }) => {
  if (!localStorage.getItem('Auth')) {
    document.location.href = '/login';
  }

  return children;
});

const convertedComponent = (Component) => (
    <AuthenticationWrapper>
      <Header/>
      <Component/>
      <Footer/>
    </AuthenticationWrapper>
);

const Router = () => {
  return (
      <div className="content">
          <Switch>
              <Route exact path="/" component={() => convertedComponent(HomePage)}/>
              <Route exact path="/cars" component={() => convertedComponent(CarsPage)}/>
              <Route exact path="/users" component={() => convertedComponent(UsersPage)}/>
              <Route exact path="/requests" component={() => convertedComponent(AdminRequests)}/>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/profile" component={() => convertedComponent(ProfilePage)} />
              <Redirect to="/"/>
          </Switch>
      </div>
  );
};

export default Router;
