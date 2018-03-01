import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, SupplierDashboard, Report, LogReport } from './containers';
import queryString from 'query-string';

export default [
  <Route
    key="/dashboard"
    exact
    path="/dashboard"
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <Dashboard {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key="/rfq-and-eoi"
    exact
    path="/rfq-and-eoi"
    component={SupplierDashboard}
  />,
  <Route key="/report" exact path="/report" component={Report} />,
  <Route key="/logs" exact path="/logs" component={LogReport} />
];
