import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Sidenav, Header } from './modules/layout/containers';
import { Layout, Breadcrumb } from 'antd';
import DashboardRoute from './modules/dashboard/routes';
import {
  CompaniesRoute,
  RegistrationRoute,
  PrequalificationRoute
} from './modules/companies/routes';
import {
  RfqRoute,
  PublishRfqRoute,
  EoiRoute,
  PublishEoiRoute,
  EditTenderRoute
} from './modules/tenders/routes';
import {
  ForgotPasswordRoute,
  ResetPasswordRoute,
  SignInRoute,
  HomeRoute,
  RegisterRoute
} from './modules/auth/routes';

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
            {HomeRoute()}

            {/*  buyer routes */}
            {DashboardRoute()}
            {CompaniesRoute()}
            {RfqRoute()}
            {PublishRfqRoute()}
            {EoiRoute()}
            {PublishEoiRoute()}
            {EditTenderRoute()}

            {/* supplier routes */}
            {RegistrationRoute()}
            {PrequalificationRoute()}

            {/* Auth routes */}
            {SignInRoute()}
            {RegisterRoute()}
            {ResetPasswordRoute()}
            {ForgotPasswordRoute()}
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
