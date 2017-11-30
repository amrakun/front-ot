import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Sidenav, Header } from './modules/layout/containers';
import { Layout, Breadcrumb } from 'antd';
import RfqRoutes from './modules/rfq/routes';
import EoiRoutes from './modules/eoi/routes';
import DashboardRoutes from './modules/dashboard/routes';
import RegistrationRoutes from './modules/registration/routes';
import PrequalificationRoutes from './modules/prequalification/routes';

const { Content, Footer } = Layout;

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Sidenav />
      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Header />

        <Content>
          <Breadcrumb>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <Switch>
            {DashboardRoutes()}
            {RfqRoutes()}
            {EoiRoutes()}

            {/* supplier routes below */}
            {RegistrationRoutes()}
            {PrequalificationRoutes()}
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
