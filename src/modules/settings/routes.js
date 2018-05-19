import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import { UserList } from './containers';
import { ManageTemplates } from './components';
import { ManageExpiryDates } from './components';

export default [
  <Route
    key="/user-list"
    exact
    path="/user-list"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <UserList queryParams={queryParams} />;
    }}
  />,

  <Route
    key="/settings/templates"
    exact
    path="/settings/templates"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <ManageTemplates queryParams={queryParams} />;
    }}
  />,

  <Route
    key="/settings/manage-expiry-dates"
    exact
    path="/settings/manage-expiry-dates"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <ManageExpiryDates queryParams={queryParams} />;
    }}
  />
];
