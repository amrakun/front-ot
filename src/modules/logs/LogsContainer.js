import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { Loading } from 'modules/common/components';
import router from 'modules/common/router';
import Logs from './components/Logs';
import { queries as userQueries } from 'modules/settings/graphql/index';
import queries from './graphql';

const LogsContainer = ({ logsQuery, usersQuery, history, qp }) => {
  if (logsQuery.error) {
    return null;
  }

  if (logsQuery.loading || usersQuery.loading) {
    return <Loading />;
  }

  const { logs, totalCount } = logsQuery.logs;
  const updatedProps = {
    qp,
    logs,
    totalCount,
    refetch: logsQuery.refetch,
    numbering: router.getParam(history, 'page')
      ? 10 * (Number(router.getParam(history, 'page')) - 1) + 1
      : 1,
    users: usersQuery.users || [],
    history,
  };

  return <Logs {...updatedProps} />;
};

LogsContainer.propTypes = {
  logsQuery: PropTypes.object.isRequired,
  usersQuery: PropTypes.object.isRequired,
  qp: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  graphql(gql(queries.logs), {
    name: 'logsQuery',
    options: ({ qp }) => ({
      variables: {
        page: qp.page ? Number(qp.page) : 1,
        perPage: qp.perPage ? Number(qp.perPage) : 10,
        start: qp.start,
        end: qp.end,
        userId: qp.userId,
        action: qp.action,
      },
      notifyOnNetworkStatusChange: true,
    }),
  }),
  graphql(gql(userQueries.users), {
    name: 'usersQuery',
  })
)(withRouter(LogsContainer));
