import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, SupplierDashboard } from './containers';

export function DashboardRoute() {
  return (
    <Route key="/dashboard" exact path="/dashboard" component={Dashboard} />
  );
}

export function SupplierDashboardRoute() {
  return (
    <Route
      key="/rfq-and-eoi"
      exact
      path="/rfq-and-eoi"
      component={SupplierDashboard}
    />
  );
}
