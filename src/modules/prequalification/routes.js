import React from 'react';
import { Route } from 'react-router-dom';
import Prequalification from './containers';

export default function() {
  return (
    <Route
      key="/Prequalification"
      exact
      path="/Prequalification"
      component={Prequalification}
    />
  );
}
