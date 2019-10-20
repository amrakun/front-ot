import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import { BuyerTenders, CreateTender, Tender, EditTender, SubmitTender } from './containers';
import { PublicEoi } from './components';

const generateQueryParams = props => {
  return queryString.parse(props.location.search);
};

export default [
  <Route key="peoi" exact path="/expression-of-interest" component={PublicEoi} />,
  <Route
    key={'/trfq'}
    exact
    path={'/trfq'}
    component={props => {
      return <BuyerTenders {...props} queryParams={generateQueryParams(props)} type="trfq" />;
    }}
  />,
  <Route
    key={'/rfq'}
    exact
    path={'/rfq'}
    component={props => {
      return <BuyerTenders type="rfq" {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/eoi'}
    exact
    path={'/eoi'}
    component={props => {
      return <BuyerTenders type="eoi" {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/trfq/publish'}
    exact
    path={'/trfq/publish'}
    component={props => {
      return <CreateTender {...props} type="trfq" queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/rfq/publish'}
    exact
    path={'/rfq/publish'}
    component={props => {
      return <CreateTender {...props} type="rfq" queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/eoi/publish'}
    exact
    path={'/eoi/publish'}
    component={props => {
      return <CreateTender {...props} type="eoi" queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/rfq'}
    exact
    path={`/rfq/:id`}
    component={props => {
      return <Tender {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/trfq'}
    exact
    path={`/trfq/:id`}
    component={props => {
      return <Tender {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/eoi'}
    exact
    path={`/eoi/:id`}
    component={props => {
      return <Tender {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route
    key={'/tender/submit'}
    exact
    path={`${'/tender/submit'}/:id`}
    component={props => {
      return <SubmitTender {...props} queryParams={generateQueryParams(props)} />;
    }}
  />,
  <Route key={'/tender/edit'} exact path={`${'/tender/edit'}/:id`} component={EditTender} />,
];
