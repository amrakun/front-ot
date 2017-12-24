import React from 'react';
import { Route } from 'react-router-dom';
import { Companies, Registration, Prequalification } from './containers';

export default [
  <Route
    key="/prequalification"
    exact
    path="/prequalification"
    component={Prequalification}
  />,
  <Route
    key="/registration"
    exact
    path="/registration"
    component={Registration}
  />,
  <Route key="/companies" exact path="/companies" component={Companies} />
];
