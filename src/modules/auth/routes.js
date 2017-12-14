import React from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import { SignIn, ForgotPassword, ResetPassword, Register } from './containers';
import { Home } from './components';

export function SignInRoute() {
  return <Route key="/sign-in" exact path="/sign-in" component={SignIn} />;
}

export function RegisterRoute() {
  return <Route key="/register" exact path="/register" component={Register} />;
}

export function ForgotPasswordRoute() {
  return (
    <Route
      key="/forgot-password"
      exact
      path="/forgot-password"
      component={ForgotPassword}
    />
  );
}

export function ResetPasswordRoute() {
  return (
    <Route
      key="/reset-password"
      exact
      path="/reset-password"
      component={({ location }) => {
        const parsed = queryString.parse(location.search);
        return <ResetPassword token={parsed.token} />;
      }}
    />
  );
}

export function HomeRoute() {
  return <Route key="home" exact path="/" component={Home} />;
}
