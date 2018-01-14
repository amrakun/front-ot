import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import {
  Difot,
  DueDiligence,
  Validation,
  Blocking,
  Feedback,
  SubmitFeedback,
  FeedbackResponses,
  FeedbackDetail,
  SupplierStatus,
  Status
} from './containers';

export default [
  <Route
    key="/prequalification-status"
    exact
    path="/prequalification-status/:id"
    component={SupplierStatus}
  />,
  <Route
    key="/prequalification-status"
    exact
    path="/prequalification-status"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <Status queryParams={queryParams} />;
    }}
  />,
  <Route
    key="/difot"
    exact
    path="/difot"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <Difot queryParams={queryParams} />;
    }}
  />,
  <Route
    key="/due-diligence"
    exact
    path="/due-diligence"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <DueDiligence queryParams={queryParams} />;
    }}
  />,
  <Route
    key="/validation"
    exact
    path="/validation"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <Validation queryParams={queryParams} />;
    }}
  />,
  <Route
    key="/blocking"
    exact
    path="/blocking"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <Blocking queryParams={queryParams} />;
    }}
  />,
  <Route
    key="/feedback"
    exact
    path="/feedback"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <Feedback queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/feedback/submit'}
    exact
    path={`${'/feedback/submit'}/:id`}
    component={SubmitFeedback}
  />,
  <Route
    key={'/feedback/responses'}
    exact
    path={'/feedback/responses'}
    component={FeedbackResponses}
  />,
  <Route
    key="/feedback/response"
    exact
    path="/feedback/response/:id"
    component={FeedbackDetail}
  />
];
