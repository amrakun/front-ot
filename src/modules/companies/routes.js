import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import {
  BaseList,
  Registration,
  Prequalification,
  CapacityBuilding,
  ViewRegistration
} from './containers';

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
  <Route
    key="/capacity-building"
    exact
    path="/capacity-building"
    component={CapacityBuilding}
  />,
  <Route
    key="/companies"
    exact
    path="/companies"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <BaseList queryParams={queryParams} />;
    }}
  />,
  <Route
    key="/view-registration"
    exact
    path="/view-registration/:id"
    component={ViewRegistration}
  />
];
