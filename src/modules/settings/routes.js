import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import { UserList } from './containers';

export default [
  <Route
    key="/user-list"
    exact
    path="/user-list"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <UserList queryParams={queryParams} />;
    }}
  />
];
