import React from 'react';
import { Route } from 'react-router-dom';
import {
  Tenders,
  CreateTender,
  Tender,
  EditTender,
  SubmitTender
} from './containers';
import {
  rfq,
  eoi,
  newRfq,
  newEoi,
  editTender,
  submitTender,
  viewTender
} from '../common/paths';

export default [
  <Route key={rfq.path} exact path={rfq.path} component={Tenders} />,
  <Route key={newRfq.path} exact path={newRfq.path} component={CreateTender} />,
  <Route key={eoi.path} exact path={eoi.path} component={Tenders} />,
  <Route
    key={viewTender.path}
    exact
    path={`${viewTender.path}/:id`}
    component={Tender}
  />,
  <Route
    key={submitTender.path}
    exact
    path={`${submitTender.path}/:id`}
    component={SubmitTender}
  />,
  <Route
    key={editTender.path}
    exact
    path={`${editTender.path}/:id`}
    component={EditTender}
  />,
  <Route key={newEoi.path} exact path={newEoi.path} component={CreateTender} />
];
