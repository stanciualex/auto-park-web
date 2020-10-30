import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ text, to }) => {
    return (
        <Link to={to}>
            <div className="menu-container__item">
                {text}
            </div>
        </Link>
    );
};

export default MenuItem;