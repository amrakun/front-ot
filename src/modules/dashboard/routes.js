import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, SupplierDashboard, Report } from './containers';

export default [
  <Route key="/dashboard" exact path="/dashboard" component={Dashboard} />,
  <Route
    key="/rfq-and-eoi"
    exact
    path="/rfq-and-eoi"
    component={SupplierDashboard}
  />,
  <Route key="/report" exact path="/report" component={Report} />
];
