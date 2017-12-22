import React from 'react';
import { Route } from 'react-router-dom';
import { Tenders, CreateTender, Tender, EditTender } from './containers';
import {
  rfq,
  eoi,
  newRfq,
  newEoi,
  editTender,
  submitTender,
  viewTender
} from '../common/paths';

export function RfqRoute() {
  return <Route key={rfq.path} exact path={rfq.path} component={Tenders} />;
}
export function PublishRfqRoute() {
  return (
    <Route
      key={newRfq.path}
      exact
      path={newRfq.path}
      component={CreateTender}
    />
  );
}
export function PublishEoiRoute() {
  return (
    <Route
      key={newEoi.path}
      exact
      path={newEoi.path}
      component={CreateTender}
    />
  );
}
export function EditTenderRoute() {
  return (
    <Route
      key={editTender.path}
      exact
      path={`${editTender.path}/:id`}
      component={EditTender}
    />
  );
}
export function SubmitTenderRoute() {
  return (
    <Route
      key={submitTender.path}
      exact
      path={`${submitTender.path}/:id`}
      component={CreateTender}
    />
  );
}
export function ViewTenderRoute() {
  return (
    <Route
      key={viewTender.path}
      exact
      path={`${viewTender.path}/:id`}
      component={Tender}
    />
  );
}
export function EoiRoute() {
  return <Route key={eoi.path} exact path={eoi.path} component={Tenders} />;
}
