import React from 'react';
import PropTypes from 'prop-types';
import { ReportsAndPlans } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';
import { withTableProps } from 'modules/common/containers';

class ReportsAndPlansContainer extends React.Component {
  render() {
    const { auditResponsesQuery } = this.props;

    if (auditResponsesQuery.loading) {
      return <ReportsAndPlans loading={true} />;
    }
    console.log(auditResponsesQuery);
    const updatedProps = {
      ...this.props,
      data: auditResponsesQuery.auditResponses || []
    };

    return <ReportsAndPlans {...updatedProps} />;
  }
}

ReportsAndPlansContainer.propTypes = {
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
          supplierSearch: params.search,
          isFileGenerated: true
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(withTableProps(ReportsAndPlansContainer));
