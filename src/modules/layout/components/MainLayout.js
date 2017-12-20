import React from 'react';
import Sidenav from './Sidenav';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import { Layout } from 'antd';
import { PropTypes } from 'prop-types';
import { buyerPaths } from 'modules/common/paths';

const { Content, Footer } = Layout;
const withSidebar = { marginLeft: 200 };
const withSidebarCollapsed = { marginLeft: 64 };

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
    return { currentUser: this.props.currentUser };
  }

  componentDidMount() {
    const { history, currentUser, location } = this.props;

    if (!currentUser) {
      history.push('/');
    } else if (
      currentUser.isSupplier &&
      buyerPaths.includes(location.pathname)
    ) {
      history.push('/sign-in');
    }
  }

  render() {
    const { currentUser, children, location } = this.props;
    const { collapsed } = this.state;

    const navProps = {
      collapsed: collapsed ? true : false,
      onCollapse: this.onCollapse
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
        <Layout className="main" style={layoutStyle}>
          <Header />
          <Content>
            {currentUser && <Breadcrumb {...location} />}
            {children}
          </Content>
          <Footer>Oyu Tolgoi ©2018 All Rights Reserved</Footer>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
  currentUser: PropTypes.object,
  children: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

MainLayout.childContextTypes = {
  currentUser: PropTypes.object
};

export default MainLayout;
