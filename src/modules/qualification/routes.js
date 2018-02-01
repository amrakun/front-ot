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
  SupplierStatus,
  Status,
  Audit,
  AuditResponses,
  SubmitAudit,
  AuditRequests,
  QualifyAudit,
  ReportsAndPlans,
  PhysicalAudits
} from './containers';
import { SubmitAudit as SupplierAuditForm } from './components';

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
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <FeedbackResponses queryParams={queryParams} {...props} />;
    }}
  />,
  <Route
    key="/audit"
    exact
    path="/audit"
    component={({ location }) => {
      const queryParams = queryString.parse(location.search);
      return <Audit queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/audit/responses'}
    exact
    path={'/audit/responses'}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <AuditResponses {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/audit/responses-physical'}
    exact
    path={'/audit/responses-physical'}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <PhysicalAudits {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/audit/reports'}
    exact
    path={'/audit/reports'}
    component={ReportsAndPlans}
  />,
  <Route
    key={'/audit/template'}
    exact
    path={'/audit/template'}
    component={SupplierAuditForm}
  />,
  <Route
    key={'/audit/submit'}
    exact
    path={'/audit/submit/:id'}
    component={SubmitAudit}
  />,
  <Route
    key={'/audit/qualify'}
    exact
    path={'/audit/qualify'}
    component={QualifyAudit}
  />,
  <Route
    key={'/qualification'}
    exact
    path={'/qualification'}
    component={AuditRequests}
  />
];
