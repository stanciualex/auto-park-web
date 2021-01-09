import React, {useEffect} from "react";
import homeImage from '../../assets/images/home.jpg';
import {connect} from "react-redux";



const HomePage = (user) => {
  return (
      <div className="home">
          {user.user.firstname && user.user.lastname && <div className="homeTitle">{`Hello, ${user.user.firstName} ${user.user.lastName}`}</div>}
          {!user.user.firstname && <div className="homeTitle">Hello!</div>}
          <div className="homeSubTitle">WELCOME TO AUTO PARK!</div>
          <img src={homeImage} className="homeImage"/>
      </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(HomePage);
