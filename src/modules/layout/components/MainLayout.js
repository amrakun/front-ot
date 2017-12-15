import React from 'react';
import Sidenav from './Sidenav';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import { Layout } from 'antd';
import { PropTypes } from 'prop-types';
import { buyerPaths } from 'modules/common/constants';

const { Content, Footer } = Layout;
const withSidebar = { marginLeft: 200 };

class MainLayout extends React.Component {
  getChildContext() {
    return { currentUser: this.props.currentUser };
  }

  componentDidMount() {
    const { history, currentUser, location } = this.props;

    if (!currentUser) {
      history.push('/sign-in');
    } else if (
      currentUser.isSupplier &&
      buyerPaths.includes(location.pathname)
    ) {
      history.push('/');
    }
  }

  render() {
    const { currentUser, children } = this.props;

    return (
      <Layout>
        {currentUser && <Sidenav />}
        <Layout className="main" style={currentUser && withSidebar}>
          <Header />
          <Content>
            {currentUser && <Breadcrumb />}
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
