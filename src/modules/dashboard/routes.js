import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, SupplierDashboard } from './containers';

export default [
  <Route key="/dashboard" exact path="/dashboard" component={Dashboard} />,
  <Route
    key="/rfq-and-eoi"
    exact
    path="/rfq-and-eoi"
    component={SupplierDashboard}
  />
];
