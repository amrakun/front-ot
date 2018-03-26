import React from 'react';
import PropTypes from 'prop-types';
import { AuditRequests } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';

class AuditRequestsContainer extends React.Component {
  render() {
    const { auditRequestsTableQuery, location, history } = this.props;

    if (auditRequestsTableQuery.loading) {
      return <AuditRequests loading={true} />;
    }

    if (location.search === '?refetch') {
      auditRequestsTableQuery.refetch();
      history.push({ location: null });
    }

    const updatedProps = {
      ...this.props,
      loading: false,
      data: auditRequestsTableQuery.companyByUser.audits || []
    };

    return <AuditRequests {...updatedProps} />;
  }
}

AuditRequestsContainer.propTypes = {
  auditRequestsTableQuery: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(gql(queries.auditRequests), {
    name: 'auditRequestsTableQuery',
    options: ({ queryParams }) => {
      return {
        variables: {
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 15
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(AuditRequestsContainer);
