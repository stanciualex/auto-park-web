import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import {login as loginAction, logout as logoutAction} from '../../../redux/actions';
import { Link } from 'react-router-dom';

const AuthenticationButton = ({ isAuthenticated, user, logout }) => {
    const onLoginClick = () => {
        document.location.href = '/login';
    };

    const onLogoutClick = () => {
        logout();
    };

    return (
        <div
            className="menu-container__item menu-container__item--auth"
            onClick={isAuthenticated ? onLogoutClick : onLoginClick}
        >
            {isAuthenticated ? (
                <div>Logout</div>
            ) : (
                <div>Login</div>
            )}
            <PersonIcon className="menu-container__item-icon"/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user,
    user: state.auth.user,
});

export default connect(mapStateToProps, {
    login: loginAction,
    logout: logoutAction,
})(AuthenticationButton);
