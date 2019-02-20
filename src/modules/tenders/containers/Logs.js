import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { queries } from '../graphql';
import { Logs } from '..//components';

const LogsContainer = props => {
  const { logsTendersQuery, logsTenderTotalCountQuery } = props;

  const updatedProps = {
    ...props,
    logs: logsTendersQuery.logsTenders || [],
    totalCount: logsTenderTotalCountQuery.logsTenderTotalCount || 0,
  };

  return <Logs {...updatedProps} />;
};

LogsContainer.propTypes = {
  logsTendersQuery: PropTypes.object,
  logsTenderTotalCountQuery: PropTypes.object,
};

export default compose(
  graphql(gql(queries.logsTenders), {
    name: 'logsTendersQuery',
    options: ({ _id }) => {
      return {
        variables: { tenderId: _id },
        fetchPolicy: 'network-only',
      };
    },
  }),

  graphql(gql(queries.logsTenderTotalCount), {
    name: 'logsTenderTotalCountQuery',
    options: ({ _id }) => {
      return {
        variables: { tenderId: _id },
        fetchPolicy: 'network-only',
      };
    },
  })
)(LogsContainer);
