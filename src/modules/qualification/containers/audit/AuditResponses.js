import React from 'react';
import PropTypes from 'prop-types';
import { AuditResponses } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';
import { withTableProps } from 'modules/common/containers';

class AuditResponsesContainer extends React.Component {
  render() {
    const { auditResponsesQuery, totalCountsQuery } = this.props;

    if (auditResponsesQuery.loading || totalCountsQuery.loading) {
      return <AuditResponses loading={true} />;
    }

    const updatedProps = {
      ...this.props,
      counts: totalCountsQuery.auditResponseTotalCounts,
      data: auditResponsesQuery.auditResponses || []
    };

    return <AuditResponses {...updatedProps} />;
  }
}

AuditResponsesContainer.propTypes = {
  auditResponsesQuery: PropTypes.object,
  totalCountsQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.auditResponses), {
    name: 'auditResponsesQuery',
    options: ({ queryParams }) => {
      const params = queryParams || {};
      return {
        variables: {
          publishDate: params.from,
          closeDate: params.to,
          supplierSearch: params.search
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(queries.auditResponseTotalCounts), {
    name: 'totalCountsQuery'
  })
)(withTableProps(AuditResponsesContainer));
