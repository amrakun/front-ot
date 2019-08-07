import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

import LogsContainer from './LogsContainer';

export default [
  <Route
    key="/action-logs"
    path="/action-logs"
    exact
    component={({ location, history }) => {
      const qp = queryString.parse(location.search);

      return <LogsContainer qp={qp} history={history} />;
    }}
  />,
];
