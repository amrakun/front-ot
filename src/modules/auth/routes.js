import React from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import {
  SignIn,
  ForgotPassword,
  ResetPassword,
  Register,
  RegisterConfirmation,
  ProfileEditConfirmation,
  Profile,
  ChangePassword,
  ResendConfirmationLink,
  Delegation
} from './containers';
import { Home } from './components';

export default [
  <Route key="home" exact path="/" component={Home} />,
  <Route key="/sign-in" exact path="/sign-in" component={SignIn} />,
  <Route key="/register" exact path="/register" component={Register} />,
  <Route
    key="/resend-confirmation-link"
    exact
    path="/resend-confirmation-link"
    component={ResendConfirmationLink}
  />,
  <Route key="/delegation" exact path="/delegation" component={Delegation} />,
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
    key="/confirm-profile-edition"
    exact
    path="/confirm-profile-edition"
    component={({ location, history }) => {
      const parsed = queryString.parse(location.search);
      return <ProfileEditConfirmation token={parsed.token} history={history} />;
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
  />,
  <Route
    key="/permission-denied"
    exact
    path="/permission-denied"
    component={() => {
      return <div>Permission denied</div>;
    }}
  />
];
