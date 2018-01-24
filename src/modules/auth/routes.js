import React from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import {
  SignIn,
  ForgotPassword,
  ResetPassword,
  Register,
  RegisterConfirmation,
  Profile,
  ChangePassword
} from './containers';
import { Home, PublicEoi } from './components';

export default [
  <Route key="home" exact path="/" component={Home} />,
  <Route
    key="peoi"
    exact
    path="/expression-of-interest"
    component={PublicEoi}
  />,
  <Route key="/sign-in" exact path="/sign-in" component={SignIn} />,
  <Route key="/register" exact path="/register" component={Register} />,
  <Route
    key="/forgot-password"
    exact
    path="/forgot-password"
    component={ForgotPassword}
  />,
  <Route
    key="/reset-password"
    exact
    path="/reset-password"
    component={({ location }) => {
      const parsed = queryString.parse(location.search);
      return <ResetPassword token={parsed.token} />;
    }}
  />,
  <Route
    key="/confirm-registration"
    exact
    path="/confirm-registration"
    component={({ location }) => {
      const parsed = queryString.parse(location.search);
      return <RegisterConfirmation token={parsed.token} />;
    }}
  />,
  <Route
    key="/my-profile"
    exact
    path="/my-profile"
    component={({ location }) => {
      const parsed = queryString.parse(location.search);
      return <Profile token={parsed.token} />;
    }}
  />,
  <Route
    key="/change-password"
    exact
    path="/change-password"
    component={({ location }) => {
      const parsed = queryString.parse(location.search);
      return <ChangePassword token={parsed.token} />;
    }}
  />
];
