import React from 'react';
import { Route } from 'react-router-dom';
import { Tenders, Publish, Tender } from './containers';
import {
  rfqPath,
  eoiPath,
  newRfqPath,
  newEoiPath,
  editTenderPath,
  viewTenderPath
} from '../common/constants';

export function RfqRoute() {
  return <Route key={rfqPath} exact path={rfqPath} component={Tenders} />;
}
export function PublishRfqRoute() {
  return <Route key={newRfqPath} exact path={newRfqPath} component={Publish} />;
}
export function EditTenderRoute() {
  return (
    <Route
      key={editTenderPath}
      exact
      path={`${editTenderPath}/:id`}
      component={Publish}
    />
  );
}
export function ViewTenderRoute() {
  return (
    <Route
      key={viewTenderPath}
      exact
      path={`${viewTenderPath}/:id`}
      component={Tender}
    />
  );
}
export function EoiRoute() {
  return <Route key={eoiPath} exact path={eoiPath} component={Tenders} />;
}
export function PublishEoiRoute() {
  return <Route key={newEoiPath} exact path={newEoiPath} component={Publish} />;
}
