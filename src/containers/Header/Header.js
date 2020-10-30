import React from 'react';
import Menu from "./components/Menu";

const Header = () => {
    return (
        <header>
            <div className="logo-wrapper">
                Auto Park
            </div>
            <div className="menu-wrapper">
                <Menu/>
            </div>
        </header>
    );
};

export default Header;