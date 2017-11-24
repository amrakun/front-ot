import React from 'react';
import { Route } from 'react-router-dom';
import Eoi from './containers'
import { MainLayout } from '../layout/containers';

const routes = () => [
  <Route
    key="/eoi"
    exact
    path="/eoi"
    component={() => {
      return (
        <MainLayout content={<Eoi />} />
      );
    }}
  />
];

export default routes;
