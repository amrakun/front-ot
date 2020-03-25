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
  CapacityBuilding,
  Status,
  Audit,
  AuditSendForm,
  AuditResponses,
  SubmitAudit,
  AuditRequests,
  QualifyAudit,
  ReportsAndPlans,
  PhysicalAudits,
} from './containers';
import { SubmitAudit as SupplierAuditForm } from './components';

const generateQueryParams = props => {
  return queryString.parse(props.location.search);
};

export default [
  <Route
    key="/prequalification-status"
    exact
    path="/prequalification-status/:id"
    component={SupplierStatus}
  />,
  <Route
    key="/capacity-building-status"
    exact
    path="/capacity-building-status"
    component={props => {
      return <CapacityBuilding queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key="/prequalification-status"
    exact
    path="/prequalification-status"
    component={props => {
      return <Status queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key="/difot"
    exact
    path="/difot"
    component={props => {
      return <Difot queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key="/due-diligence"
    exact
    path="/due-diligence"
    component={props => {
      return <DueDiligence queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key="/validation"
    exact
    path="/validation"
    component={props => {
      return <Validation queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key="/blocking"
    exact
    path="/blocking"
    component={props => {
      return <Blocking queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key="/feedback"
    exact
    path="/feedback"
    component={props => {
      return <Feedback queryParams={generateQueryParams(props)} />;
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
      return <FeedbackResponses {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key="/audit"
    exact
    path="/audit"
    component={props => {
      return <Audit queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key="/audit/send"
    exact
    path="/audit/send"
    component={props => {
      return <AuditSendForm {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/audit/responses'}
    exact
    path={'/audit/responses'}
    component={props => {
      return <AuditResponses {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/audit/responses-physical'}
    exact
    path={'/audit/responses-physical'}
    component={props => {
      return <PhysicalAudits {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/audit/reports'}
    exact
    path={'/audit/reports'}
    component={props => {
      return <ReportsAndPlans {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route key={'/audit/template'} exact path={'/audit/template'} component={SupplierAuditForm} />,
  <Route key={'/audit/submit'} exact path={'/audit/submit/:id'} component={SubmitAudit} />,
  <Route key={'/audit/qualify'} exact path={'/audit/qualify'} component={QualifyAudit} />,
  <Route
    key={'/qualification'}
    exact
    path={'/qualification'}
    component={props => {
      return <AuditRequests {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
];
