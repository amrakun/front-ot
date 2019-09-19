import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { queries } from '../graphql';
import { Logs } from '../components';

const LogsContainer = props => {
  const { logsTenderQuery, logsTenderTotalCountQuery } = props;

  const updatedProps = {
    ...props,
    logs: logsTenderQuery.logsTender || [],
    totalCount: logsTenderTotalCountQuery.logsTenderTotalCount || 0,
  };

  return <Logs {...updatedProps} />;
};

LogsContainer.propTypes = {
  logsTenderQuery: PropTypes.object,
  logsTenderTotalCountQuery: PropTypes.object,
  queryParams: PropTypes.object,
};

export default compose(
  graphql(gql(queries.logsTender), {
    name: 'logsTenderQuery',
    options: ({ _id, queryParams }) => ({
      variables: { tenderId: _id, page: queryParams.logpage, perPage: queryParams.logperPage },
      fetchPolicy: 'network-only',
    }),
  }),

  graphql(gql(queries.logsTenderTotalCount), {
    name: 'logsTenderTotalCountQuery',
    options: ({ _id }) => ({
      variables: { tenderId: _id },
      fetchPolicy: 'network-only',
    }),
  })
)(LogsContainer);
