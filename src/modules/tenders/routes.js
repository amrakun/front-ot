import React from 'react';
import { Route } from 'react-router-dom';
import {
  Tenders,
  CreateTender,
  Tender,
  EditTender,
  SubmitTender
} from './containers';

export default [
  <Route
    key={'/rfq'}
    exact
    path={'/rfq'}
    component={() => <Tenders type="rfq" />}
  />,
  <Route
    key={'/rfq/publish'}
    exact
    path={'/rfq/publish'}
    component={CreateTender}
  />,
  <Route
    key={'/eoi'}
    exact
    path={'/eoi'}
    component={() => <Tenders type="eoi" />}
  />,
  <Route key={'/tender'} exact path={`${'/tender'}/:id`} component={Tender} />,
  <Route
    key={'/tender/submit'}
    exact
    path={`${'/tender/submit'}/:id`}
    component={SubmitTender}
  />,
  <Route
    key={'/tender/edit'}
    exact
    path={`${'/tender/edit'}/:id`}
    component={EditTender}
  />,
  <Route
    key={'/eoi/publish'}
    exact
    path={'/eoi/publish'}
    component={CreateTender}
  />
];
