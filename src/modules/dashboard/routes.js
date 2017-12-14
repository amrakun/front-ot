import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers';

export default function() {
  return (
    <Route key="/dashboard" exact path="/dashboard" component={Dashboard} />
  );
}
