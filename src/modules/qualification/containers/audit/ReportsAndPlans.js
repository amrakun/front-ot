import React from 'react';
import PropTypes from 'prop-types';
import { ReportsAndPlans } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { withTableProps } from 'modules/common/containers';
import { message } from 'antd';

class ReportsAndPlansContainer extends React.Component {
  render() {
    const {
      auditResponsesTableQuery,
      auditsBuyerSaveFiles,
      auditsBuyerSendFiles
    } = this.props;

    if (auditResponsesTableQuery.loading) {
      return <ReportsAndPlans loading={true} />;
    }

    const saveFiles = variables => {
      auditsBuyerSaveFiles({ variables })
        .then(() => {
          message.success('Succesfully saved your file!');
        })
        .catch(() => {
          message.error(message.error);
        });
    };

    const sendFiles = variables => {
      auditsBuyerSendFiles({ variables })
        .then(() => {
          message.success('Succesfully sent!');
          auditResponsesTableQuery.refetch();
        })
        .catch(() => {
          message.error(message.error);
        });
    };

    const updatedProps = {
      ...this.props,
      saveFiles,
      sendFiles,
      data: auditResponsesTableQuery.auditResponses || []
    };

    return <ReportsAndPlans {...updatedProps} />;
  }
}

ReportsAndPlansContainer.propTypes = {
  auditResponsesTableQuery: PropTypes.object,
  auditsBuyerSaveFiles: PropTypes.func,
  auditsBuyerSendFiles: PropTypes.func
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
          isFileGenerated: true,
          status: params.status
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.auditsBuyerSaveFiles), {
    name: 'auditsBuyerSaveFiles'
  }),

  graphql(gql(mutations.auditsBuyerSendFiles), {
    name: 'auditsBuyerSendFiles'
  })
)(withTableProps(ReportsAndPlansContainer));
