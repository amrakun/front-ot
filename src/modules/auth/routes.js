import React from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import { SignIn, ForgotPassword, ResetPassword, Register } from './containers';
import { Home } from './components';

export default [
  <Route key="home" exact path="/" component={Home} />,
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
  />
];
