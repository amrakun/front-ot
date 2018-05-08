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

  const programImg = `${process.env.PUBLIC_URL}/images/program.png`;
  const calendarImg = `${process.env.PUBLIC_URL}/images/calendar.jpg`;

  return (
    <div>
      <BackgroundSlideshow images={images} animationDelay={5000} />
      <div className="home-landing">
        <div className="home-container">
          <div className="top bg-white">
            <Row>
              <Col span={6}>
                <h1>OYU</h1>
                <h2>Supplier Qualification Management System</h2>
              </Col>
              <Col span={14}>
                <p className="text">
                  Together deliver a safe and globally competitive copper
                  business that contributes to the prosperity of Mongolia
                </p>
              </Col>
              <Col span={4}>
                <img
                  className="pull-right"
                  src={process.env.PUBLIC_URL + '/images/logo_en.png'}
                  alt="logo"
                />
              </Col>
            </Row>
            <ul className="pull-right">
              <li>
                <Link to="/sign-in">{__('Sign in')}</Link>
              </li>
              <li>
                <Link to="/register">{__('Register as a supplier')}</Link>
              </li>
            </ul>
          </div>

          <div className="bottom bg-white">
            <h3>Welcome to “Oyu” Supplier Qualification Management System</h3>
            <Row gutter={20}>
              <Col span={12}>
                <div className="desc">
                  <p>
                    Oyu Tolgoi LLC provides an opportunity to all potential
                    national companies to participate in bidding process via
                    SQMS and contributes further development of  national
                    companies.
                  </p>
                  <p>
                    If you are interested in becoming Oyu Tolgoi  supplier and
                    become part of world class development, please register into
                    the system.
                  </p>
                </div>
              </Col>
              <Col span={6}>
                <a className="item program">
                  <div className="text">
                    Capacity Building Program Coming soon!
                  </div>
                  <img
                    src={programImg}
                    alt="Capacity Building Program Coming soon!"
                  />
                </a>
              </Col>
              <Col span={6}>
                <a
                  target="blank"
                  href="http://ot.mn/plugins/event/?y=2018"
                  className="item calendar"
                >
                  <div className="text">Monthly Open Info Session Calendar</div>
                  <img
                    src={calendarImg}
                    alt="Monthly Open Info Session Calendar"
                  />
                </a>
              </Col>
              <Col span={24}>
                <div className="footer">
                  <Row gutter={20}>
                    <Col span={24}>
                      <p>
                        If you have any questions about registering in the Oyu
                        database, please contact the following address:
                      </p>
                    </Col>
                    <Col span={12}>
                      <p>
                        <b>B.Togosoo</b>
                        <br />
                        <b>Email:</b> togosoob@ot.mn<br />
                        <b>Phone:</b> 331880; Ext - 3604<br />
                      </p>
                    </Col>
                    <Col span={12}>
                      <p>
                        <b>G.Narantsatsral</b>
                        <br />
                        <b>Email:</b> narantsatsralg@ot.mn<br />
                        <b>Phone:</b> 331880; Ext-3789
                      </p>
                    </Col>
                    <Col span={24}>
                      <p>
                        Oyu Tolgoi LLC Supply Department Monnis tower 5th floor
                        Chinggis Avenue 15 Sukhbaatar District – 14240
                        Ulaanbaatar, Mongolia
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
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
