import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { connect } from 'react-redux';

import {login as loginAction, logout as logoutAction} from '../../../redux/actions';

const AuthenticationButton = ({ isAuthenticated, user, login, logout }) => {
    const onLoginClick = () => {
        login('test@test.com');
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
                <div>{`Hello, ${user.firstName} ${user.lastName}`} Logout</div>
            ) : (
                <div>Login</div>
            )}
            <PersonIcon className="menu-container__item-icon"/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user,
    user: state.user,
});

export default connect(mapStateToProps, {
    login: loginAction,
    logout: logoutAction,
})(AuthenticationButton);