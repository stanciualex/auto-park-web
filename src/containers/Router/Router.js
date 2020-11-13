import React from 'react';
import {
    BrowserRouter,
    Route,
} from 'react-router-dom';
import HomePage from "../../pages/home/HomePage";
import CarsPage from "../../pages/cars/CarsPage";
import UsersPage from "../../pages/users/UsersPage";
import AdminRequests from "../AdminRequests/AdminRequests";

const Router = () => {
    return (
        <div className="content">
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/cars" component={CarsPage}/>
            <Route exact path="/users" component={UsersPage}/>
            <Route exact path="/requests" component={AdminRequests}/>
        </div>
    );
};

export default Router;