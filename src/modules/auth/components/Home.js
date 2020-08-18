import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import BackgroundSlideshow from 'react-background-slideshow';
import { Row, Col, Modal } from 'antd';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  toggleContact() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { currentUser, __, locale, toggleLang } = this.context;

    if (currentUser) {
      currentUser.isSupplier
        ? this.props.history.push('/rfq-and-eoi')
        : this.props.history.push('/dashboard');
    }

    const images = [];

    for (let i = 1; i < 6; i++) {
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
                  <img
                    className="pull-left"
                    src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
                    height="200"
                    alt="logo"
                  />
                </Col>
                <Col span={12}>
                  <p className="text">
                    {__(
                      'Together deliver a safe and globally competitive copper business that contributes to the prosperity of Mongolia'
                    )}
                  </p>
                </Col>
                <Col span={6}>
                  <img
                    className="pull-right"
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    width="85"
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
                <li>
                  <a href="#contact-us" onClick={() => this.toggleContact()}>
                    {__('Contact us')}
                  </a>
                  <Modal
                    title={__('Contact us')}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={() => this.toggleContact()}
                  >
                    <Row gutter={20}>
                      <Col span={24}>
                        <div className="footer">
                          <Row gutter={20}>
                            <Col span={24}>
                              <p>
                                {__(
                                  'If you have any questions about registering in the Oyu database, please contact the following address:'
                                )}
                              </p>
                            </Col>
                            <Col span={12}>
                              <p>
                                <b>{__('B.Togosoo')}</b>
                                <br />
                                <b>{__('Email')}:</b> togosoob@ot.mn
                                <br />
                                <b>{__('Phone')}:</b> 331880; {__('Ext')} - 3671, 8888
                                <br />
                              </p>
                            </Col>
                            <Col span={12}>
                              <p>
                                <b>{__('G.Narantsatsral')}</b>
                                <br />
                                <b>{__('Email')}:</b> narantsatsralg@ot.mn
                                <br />
                                <b>{__('Phone')}:</b> 331880; {__('Ext')} - 3789
                              </p>
                            </Col>
                            <Col span={24}>
                              <p>
                                {__(
                                  'Oyu Tolgoi LLC Monnis tower 5th floor Chinggis Avenue 15 Sukhbaatar District – 14240 Ulaanbaatar, Mongolia'
                                )}
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Modal>
                </li>
                <li>
                  <a href="#lang" onClick={toggleLang}>
                    {locale === 'en' ? 'MN' : 'EN'}
                  </a>
                </li>
              </ul>
            </div>

            <div className="bottom bg-white">
              <div id="home-quote">#{__('OTProud')}</div>

              <h3>{__('Welcome to “Oyu” Supplier Qualification Management System')}</h3>
              <Row gutter={20}>
                <Col span={6}>
                  <div className="desc">
                    <p>
                      {__(
                        'Oyu Tolgoi LLC provides an opportunity to all potential national companies to participate in bidding process via SQMS and contributes further development of national companies.'
                      )}
                    </p>
                    <p>
                      {__(
                        'If you are interested in becoming Oyu Tolgoi supplier and become part of world class development, please register into the system.'
                      )}
                    </p>
                  </div>
                </Col>
                <Col span={12}>
                  <a
                    href="https://www.business-innovation-growth-mongolia.com/our-mission-m"
                    target="__blank"
                    className="item program"
                  >
                    <div className="text">{__('Capacity Building Program')}</div>
                    <img src={programImg} alt={__('Capacity Building Program')} />
                  </a>
                </Col>
                <Col span={6}>
                  <a
                    target="blank"
                    href="http://ot.mn/plugins/event/?y=2019"
                    className="item calendar"
                  >
                    <div className="text">{__('Quarterly Open Info Session')}</div>
                    <img src={calendarImg} alt={__('Quarterly Open Info Session')} />
                  </a>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object,
};

Home.contextTypes = {
  currentUser: PropTypes.object,
  __: PropTypes.func,
  toggleLang: PropTypes.func,
  locale: PropTypes.string,
};

export default withRouter(Home);
