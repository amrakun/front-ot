import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Sidenav } from './modules/layout/containers';
import { Layout, Breadcrumb } from 'antd';
import RfqRoutes from './modules/rfq/routes';
import EoiRoutes from './modules/eoi/routes';
import DashboardRoutes from './modules/dashboard/routes';
import RegistrationRoutes from './modules/registration/routes';

const { Header, Content, Footer } = Layout;

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Sidenav />
      <Layout>
        <Header style={{ background: '#fff', padding: 0, boxShadow: '4px 4px 40px 0 rgba(0, 0, 0, 0.05)' }} />

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <Switch>
            {RfqRoutes()}
            {RegistrationRoutes()}
            {DashboardRoutes()}
            {EoiRoutes()}
          </Switch>

        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Oyu Tolgoi ©2018 All Rights Reserved
        </Footer>
      </Layout>
    </Layout>
  </BrowserRouter>
);

export default Routes;
