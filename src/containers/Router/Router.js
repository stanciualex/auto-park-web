import React from 'react';
import {
    BrowserRouter,
    Route,
} from 'react-router-dom';
import HomePage from "../../pages/home/HomePage";
import CarsPage from "../../pages/cars/CarsPage";
import UsersPage from "../../pages/users/UsersPage";
import AdminRequests from "../../containers/AdminRequests/AdminRequests.js";
import LoginPage from "../../pages/login/LoginPage";

const Router = () => {
    return (
        <div className="content">
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/cars" component={CarsPage}/>
            <Route exact path="/users" component={UsersPage}/>
            <Route exact path="/requests" component={AdminRequests}/>
            <Route exact path="/users/login" component={LoginPage} />
        </div>
    );
};

export default Router;
