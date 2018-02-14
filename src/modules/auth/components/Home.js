import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { T } from 'modules/common/components';

const Home = (props, context) => {
  const { currentUser } = context;

  if (currentUser) {
    currentUser.isSupplier
      ? props.history.push('/rfq-and-eoi')
      : props.history.push('/dashboard');
  }

  return (
    <div className="home-landing">
      <div
        className="background"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL +
            '/images/background.jpg'})`
        }}
      />
      <div className="content-wrapper">
        <div className="content">
          <h1>
            <T id="homeTitle">Oyu Suppliers database</T>
          </h1>
          <Link to="/expression-of-interest" className="home-btn">
            <T id="homeButtonLeft">Expression of Interest</T>
          </Link>
          <Link to="/register" className="home-btn-transparent">
            <T id="homeButtonRight">Register as supplier</T>
          </Link>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object
};

Home.contextTypes = {
  currentUser: PropTypes.object
};

export default withRouter(Home);
