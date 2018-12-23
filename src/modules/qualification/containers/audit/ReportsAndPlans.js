import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { message } from 'antd';
import { Loading } from 'modules/common/components';
import { ReportsAndPlans } from '../../components';
import { queries, mutations } from '../../graphql';

class ReportsAndPlansContainer extends React.Component {
  render() {
    const {
      auditResponsesTableQuery,
      auditsBuyerSaveFiles,
      auditsBuyerSendFiles
    } = this.props;

    if (auditResponsesTableQuery.error) {
      return null;
    }

    if (auditResponsesTableQuery.loading) {
      return <Loading />;
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
        .catch(error => {
          message.error(error.message);
        });
    };

    const updatedProps = {
      ...this.props,
      saveFiles,
      sendFiles,
      loading: false,
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
          status: params.status,
          page: params.page || 1,
          perPage: params.perPage || 15
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
)(ReportsAndPlansContainer);
