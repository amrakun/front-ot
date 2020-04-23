import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { mutations, queries } from '../../graphql';
import { AuditResponses } from '../../components';
import { exportFile, Loading } from 'modules/common/components';
import { message } from 'antd';

class AuditResponsesContainer extends React.Component {
  render() {
    const {
      auditResponsesTableQuery,
      totalCountsQuery,
      auditsBuyerSendFiles,
      auditsBuyerCancelResponse,
      auditsBuyerNotificationMarkAsRead,
    } = this.props;

    if (auditResponsesTableQuery.error || totalCountsQuery.error) {
      return null;
    }

    if (auditResponsesTableQuery.loading || totalCountsQuery.loading) {
      return <Loading />;
    }

    const sendFiles = ({ name, supplierId, auditId }) => {
      auditsBuyerSendFiles({
        variables: {
          supplierId: supplierId,
          auditId: auditId,
          improvementPlan: name === 'auditReport',
          report: name === 'auditImprovementPlan',
        },
      })
        .then(() => {
          message.success('Successfuly sent!');
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const cancel = responseId => {
      auditsBuyerCancelResponse({
        variables: {
          responseId,
        },
      })
        .then(() => {
          auditResponsesTableQuery.refetch();
          message.success('Successfuly canceled!');
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const markAsRead = responseId => {
      auditsBuyerNotificationMarkAsRead({
        variables: {
          responseId,
        },
      })
        .then(() => {
          auditResponsesTableQuery.refetch();
          message.success('Successfuly marked!');
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const exportExcel = () => {
      exportFile({
        query: queries.auditExportResponses,
      });
    };

    const updatedProps = {
      ...this.props,
      sendFiles,
      cancel,
      markAsRead,
      exportExcel,
      data: auditResponsesTableQuery.auditResponses || [],
    };

    return <AuditResponses {...updatedProps} />;
  }
}

AuditResponsesContainer.propTypes = {
  auditResponsesTableQuery: PropTypes.object,
  totalCountsQuery: PropTypes.object,
  auditsBuyerSendFiles: PropTypes.func,
};

export default compose(
  graphql(gql(queries.auditResponses), {
    name: 'auditResponsesTableQuery',
    options: ({ queryParams }) => {
      const params = queryParams || {};

      return {
        variables: {
          publishDate: params.from,
          closeDate: params.to,
          supplierSearch: params.search,
          page: params.page || 1,
          perPage: params.perPage || 15,
          qualStatus: params.qualStatus,
          supplierStatus: params.supplierStatus,
        },
        notifyOnNetworkStatusChange: true,
      };
    },
  }),

  graphql(gql(queries.auditResponseTotalCounts), {
    name: 'totalCountsQuery',
  }),

  graphql(gql(mutations.auditsBuyerNotificationMarkAsRead), {
    name: 'auditsBuyerNotificationMarkAsRead',
  }),

  graphql(gql(mutations.auditsBuyerSendFiles), {
    name: 'auditsBuyerSendFiles',
  }),

  graphql(gql(mutations.auditsBuyerCancelResponse), {
    name: 'auditsBuyerCancelResponse',
  })
)(AuditResponsesContainer);
