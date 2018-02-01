import React from 'react';
import PropTypes from 'prop-types';
import { AuditResponses } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';
import { withTableProps } from 'modules/common/containers';

class AuditResponsesContainer extends React.Component {
  render() {
    const { auditResponsesQuery } = this.props;

    if (auditResponsesQuery.loading) {
      return <AuditResponses loading={true} />;
    }

    const updatedProps = {
      ...this.props,
      data: auditResponsesQuery.auditResponses || []
    };

    return <AuditResponses {...updatedProps} />;
  }
}

AuditResponsesContainer.propTypes = {
  auditResponsesQuery: PropTypes.object
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
  })
)(withTableProps(AuditResponsesContainer));
