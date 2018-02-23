import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';

const Home = (props, context) => {
  const { currentUser, __ } = context;

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
          <h1>{__('Oyu Suppliers database')}</h1>
          <Link to="/expression-of-interest" className="home-btn">
            {__('Expression of Interest')}
          </Link>
          <Link to="/register" className="home-btn-transparent">
            {__('Register as supplier')}
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
  currentUser: PropTypes.object,
  __: PropTypes.func
};

export default withRouter(Home);
