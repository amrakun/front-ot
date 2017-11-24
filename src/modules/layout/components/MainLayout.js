import React from 'react'
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Sidenav from './Sidenav'

import { Layout, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const propTypes = {
  content: PropTypes.element
};

class MainLayout extends React.Component {
  render() {
    const { content } = this.props;

    return (
      <Layout>
        <Sidenav />

        <Layout>
          <Header style={{ background: '#fff', padding: 0, boxShadow: '4px 4px 40px 0 rgba(0, 0, 0, 0.05)' }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {content}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>

      </Layout>
    );
  }
}

MainLayout.propTypes = propTypes;

export default withRouter(MainLayout);
