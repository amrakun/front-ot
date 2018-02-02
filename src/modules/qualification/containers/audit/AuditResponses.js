import React from 'react';
import PropTypes from 'prop-types';
import { AuditResponses } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { mutations, queries } from '../../graphql';
import { withTableProps } from 'modules/common/containers';
import { message } from 'antd';

class AuditResponsesContainer extends React.Component {
  render() {
    const {
      auditResponsesQuery,
      totalCountsQuery,
      auditsBuyerSendFiles
    } = this.props;

    if (auditResponsesQuery.loading || totalCountsQuery.loading) {
      return <AuditResponses loading={true} />;
    }

    const sendFiles = ({ name, supplierId, auditId }) => {
      auditsBuyerSendFiles({
        variables: {
          supplierId: supplierId,
          auditId: auditId,
          improvementPlan: name === 'auditReport',
          report: name === 'auditImprovementPlan'
        }
      })
        .then(() => {
          message.success('Successfuly sent!');
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const updatedProps = {
      ...this.props,
      sendFiles,
      counts: totalCountsQuery.auditResponseTotalCounts,
      data: auditResponsesQuery.auditResponses || []
    };

    return <AuditResponses {...updatedProps} />;
  }
}

AuditResponsesContainer.propTypes = {
  auditResponsesQuery: PropTypes.object,
  totalCountsQuery: PropTypes.object,
  auditsBuyerSendFiles: PropTypes.func
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
  }),

  graphql(gql(mutations.auditsBuyerSendFiles), {
    name: 'auditsBuyerSendFiles'
  })
)(withTableProps(AuditResponsesContainer));
