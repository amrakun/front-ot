import React from 'react';
import { Route } from 'react-router-dom';
import { Companies, Registration, Prequalification } from './containers';

export function CompaniesRoute() {
  return (
    <Route key="/companies" exact path="/companies" component={Companies} />
  );
}

export function RegistrationRoute() {
  return (
    <Route
      key="/registration"
      exact
      path="/registration"
      component={Registration}
    />
  );
}

export function PrequalificationRoute() {
  return (
    <Route
      key="/prequalification"
      exact
      path="/prequalification"
      component={Prequalification}
    />
  );
}
