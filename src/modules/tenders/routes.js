import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import {
  BuyerTenders,
  CreateTender,
  Tender,
  EditTender,
  SubmitTender
} from './containers';
import { PublicEoi } from './components';

export default [
  <Route
    key="peoi"
    exact
    path="/expression-of-interest"
    component={PublicEoi}
  />,
  <Route
    key={'/trfq'}
    exact
    path={'/trfq'}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <BuyerTenders {...props} queryParams={queryParams} type="trfq" />;
    }}
  />,
  <Route
    key={'/rfq'}
    exact
    path={'/rfq'}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <BuyerTenders type="rfq" {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/eoi'}
    exact
    path={'/eoi'}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <BuyerTenders type="eoi" {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/trfq/publish'}
    exact
    path={'/trfq/publish'}
    component={props => {
      return <CreateTender {...props} type="trfq" />;
    }}
  />,
  <Route
    key={'/rfq/publish'}
    exact
    path={'/rfq/publish'}
    component={props => {
      return <CreateTender {...props} type="rfq" />;
    }}
  />,
  <Route
    key={'/eoi/publish'}
    exact
    path={'/eoi/publish'}
    component={props => {
      return <CreateTender {...props} type="eoi" />;
    }}
  />,
  <Route
    key={'/rfq'}
    exact
    path={`/rfq/:id`}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <Tender {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/trfq'}
    exact
    path={`/trfq/:id`}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <Tender {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/eoi'}
    exact
    path={`/eoi/:id`}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <Tender {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/tender/submit'}
    exact
    path={`${'/tender/submit'}/:id`}
    component={props => {
      const queryParams = queryString.parse(props.location.search);
      return <SubmitTender {...props} queryParams={queryParams} />;
    }}
  />,
  <Route
    key={'/tender/edit'}
    exact
    path={`${'/tender/edit'}/:id`}
    component={EditTender}
  />
];
