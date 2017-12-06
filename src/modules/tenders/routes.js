import React from 'react';
import { Route } from 'react-router-dom';
import { Rfq, Eoi, SendRfq } from './containers';

export function RfqRoute() {
  return <Route key="/rfq" exact path="/rfq" component={Rfq} />;
}
export function SendRfqRoute() {
  return <Route key="/sendrfq" exact path="/sendrfq" component={SendRfq} />;
}
export function EoiRoute() {
  return <Route key="/eoi" exact path="/eoi" component={Eoi} />;
}
