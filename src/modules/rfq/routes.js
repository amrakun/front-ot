import React from 'react';
import { Route } from 'react-router-dom';
import Rfq from './containers';

export default function() {
  return <Route key="/rfq" exact path="/rfq" component={Rfq} />;
}
