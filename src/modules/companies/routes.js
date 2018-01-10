import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import {
  BaseList,
  Difot,
  DueDiligence,
  Validation,
  Feedback,
  SubmitFeedback,
  FeedbackResponses,
  FeedbackDetail,
  Registration,
  Prequalification,
  CapacityBuilding
} from './containers';

export default [
  <Route
    key="/prequalification"
    exact
    path="/prequalification"
    component={Prequalification}
  />,
  <Route
    key="/registration"
    exact
    path="/registration"
    component={Registration}
  />,
  <Route
    key="/capacity-building"
    exact
    path="/capacity-building"
    component={CapacityBuilding}
  />,
  <Route
    key="/companies"
    exact
    path="/companies"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <BaseList queryParams={queryParams} />;
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
