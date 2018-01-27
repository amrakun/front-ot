import React from 'react';
import PropTypes from 'prop-types';
import { AuditRequests } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';
import { withTableProps } from 'modules/common/containers';

class AuditRequestsContainer extends React.Component {
  render() {
    const { auditRequestsQuery, location, history } = this.props;

    if (auditRequestsQuery.loading) {
      return <AuditRequests loading={true} />;
    }

    if (location.search === '?refetch') {
      auditRequestsQuery.refetch();
      history.push({ location: null });
    }

    const updatedProps = {
      ...this.props,
      data: auditRequestsQuery.companyByUser.audits || []
    };

    return <AuditRequests {...updatedProps} />;
  }
}

AuditRequestsContainer.propTypes = {
  auditRequestsQuery: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(gql(queries.auditRequests), {
    name: 'auditRequestsQuery'
  })
)(withTableProps(AuditRequestsContainer));
