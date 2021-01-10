import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ text, to, active }) => {
    let className = 'menu-container__item';

    if (active) {
        className += ' menu-container__item--active';
    }

    return (
        <Link to={to}>
            <div className={className}>
                {text}
            </div>
        </Link>
    );
};

export default MenuItem;