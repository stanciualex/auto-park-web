import React from 'react';
import MenuItem from "./MenuItem";
import AuthenticationButton from "./AuthenticationButton";
import {connect} from "react-redux";

const Menu = ({user}) => {
  console.log('user', user);
  return (
      <div className="menu-container">
          <MenuItem text="Home" to="/" />
          <MenuItem text="Profile" to="/profile" />
          <MenuItem text="Cars" to="/cars" />
          {user.role === 'admin' && <MenuItem text="Rent requests" to="/requests" />}
          {user.role === 'admin' && <MenuItem text="Users" to="/users" />}
          <AuthenticationButton/>
      </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Menu);
