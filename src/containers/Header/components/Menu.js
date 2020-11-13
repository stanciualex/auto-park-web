import React from 'react';
import MenuItem from "./MenuItem";
import AuthenticationButton from "./AuthenticationButton";

const Menu = () => {
    return (
        <div className="menu-container">
            <MenuItem text="Home" to="/" />
            <MenuItem text="Cars" to="/cars" />
            <MenuItem text="Rent requests" to="/requests" />
            <MenuItem text="Users" to="/users" />
            <AuthenticationButton/>
        </div>
    );
};

export default Menu;