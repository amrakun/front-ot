import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { MainLayout } from './modules/layout/containers';
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

const Routes = () => (
  <BrowserRouter>
    <MainLayout>
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
    </MainLayout>
  </BrowserRouter>
);

export default Routes;
