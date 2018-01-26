import React from 'react';
import Sidenav from './Sidenav';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import { Layout, BackTop } from 'antd';
import { PropTypes } from 'prop-types';

const { Content, Footer } = Layout;
const visitorPaths = [
  '/sign-in',
  '/register',
  '/expression-of-interest',
  '/confirm-registration',
  '/'
];
const withSidebar = { marginLeft: 200 };
const withSidebarCollapsed = { marginLeft: 80 };

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: localStorage.getItem('collapsed') === 'true' ? true : false
    };

    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse(collapsed) {
    localStorage.setItem('collapsed', collapsed);
    this.setState({ collapsed });
  }

  getChildContext() {
    return {
      currentUser: this.props.currentUser,
      systemConfig: this.props.systemConfig
    };
  }

  componentDidMount() {
    const { history, currentUser } = this.props;
    const path = history.location.pathname;

    if (!currentUser && !visitorPaths.includes(path)) {
      history.push('/sign-in?required');
    }
  }

  render() {
    const { currentUser, children, location } = this.props;
    const { collapsed } = this.state;

    const navProps = {
      collapsed: collapsed ? true : false,
      onCollapse: this.onCollapse,
      pathname: location.pathname
    };

    let layoutStyle = {};
    if (currentUser) {
      collapsed
        ? (layoutStyle = withSidebarCollapsed)
        : (layoutStyle = withSidebar);
    }

    return (
      <Layout>
        {currentUser && <Sidenav {...navProps} />}
        <Layout
          className="main"
          style={{
            layoutStyle,
            backgroundImage: `url(
              ${process.env.PUBLIC_URL + '/images/background.jpg'}
            )`
          }}
        >
          <Header />
          <Content>
            {currentUser && <Breadcrumb {...location} />}
            {children}
            <BackTop />
          </Content>
          <Footer>Oyu Tolgoi ©2018 All Rights Reserved</Footer>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
  currentUser: PropTypes.object,
  systemConfig: PropTypes.object,
  children: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

MainLayout.childContextTypes = {
  currentUser: PropTypes.object,
  systemConfig: PropTypes.object
};

export default MainLayout;
