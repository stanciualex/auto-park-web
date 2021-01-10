import React from 'react';
import MenuItem from "./MenuItem";
import AuthenticationButton from "./AuthenticationButton";
import {connect} from "react-redux";

const Menu = ({user}) => {
    const pathname = window.location.pathname;

    return (
        <div className="menu-container">
            <MenuItem text="Home" to="/" active={pathname === '/'}/>
            <MenuItem text="Profile" to="/profile" active={pathname === '/profile'}/>
            <MenuItem text="Cars" to="/cars" active={pathname === '/cars'}/>
            {user.role === 'admin' && <MenuItem text="Rent requests" to="/requests" active={pathname === '/requests'}/>}
            {user.role === 'admin' && <MenuItem text="Users" to="/users" active={pathname === '/users'}/>}
            <AuthenticationButton/>
        </div>
    )
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Menu);
