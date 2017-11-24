import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers'
import { MainLayout } from '../layout/containers';

const routes = () => [
  <Route
    key="/"
    exact
    path="/"
    component={() => {
      return (
        <MainLayout content={<Dashboard />} />
      );
    }}
  />
];

export default routes;
