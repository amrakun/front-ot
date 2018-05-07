import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import BackgroundSlideshow from 'react-background-slideshow';
import { Row, Col } from 'antd';

const Home = (props, context) => {
  const { currentUser, __ } = context;

  if (currentUser) {
    currentUser.isSupplier
      ? props.history.push('/rfq-and-eoi')
      : props.history.push('/dashboard');
  }

  const images = [];

  for (let i = 1; i < 3; i++) {
    images.push(`${process.env.PUBLIC_URL}/images/slider/image${i}.jpg`);
  }

  return (
    <div>
      <BackgroundSlideshow images={images} animationDelay="5000" />
      <div className="home-landing">
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>

        {/* <div className="content-wrapper">
          <div className="content">
            <div className="app-name">
              <strong>{__('Oyu')}</strong>
              <span>{__('Suppliers Database')}</span>
            </div>

            <Link to="/sign-in" className="home-btn">
              {__('Sign in')}
            </Link>

            <Link to="/register" className="home-btn-transparent">
              {__('Register as a supplier')}
            </Link>
          </div>
        </div> */}
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
