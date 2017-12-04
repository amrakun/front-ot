import React from 'react';
import { Route } from 'react-router-dom';
import { Suppliers, SendRfq } from './containers';

export function SuppliersRoute() {
  return (
    <Route key="/suppliers" exact path="/suppliers" component={Suppliers} />
  );
}
export function SendRfqRoute() {
  return <Route key="/sendrfq" exact path="/sendrfq" component={SendRfq} />;
}
