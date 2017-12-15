import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Home = (props, context) => {
  const { currentUser } = context;

  if (currentUser) {
    props.history.push('/dashboard');
  }

  return (
    <div className="center-content">
      <div className="home-landing">
        <h1>Oyu Tolgoi Procurement</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <Link to="/eoi" className="home-btn">
          Expression Of Interest
        </Link>
        <Link to="/register" className="home-btn-transparent">
          Register
        </Link>
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

export default Home;
