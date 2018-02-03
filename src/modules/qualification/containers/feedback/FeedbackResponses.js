import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackResponses } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';
import { withTableProps } from 'modules/common/containers';

class TendersContainer extends React.Component {
  render() {
    const { feedbackResponsesTableQuery } = this.props;

    if (feedbackResponsesTableQuery.loading) {
      return <FeedbackResponses loading={true} />;
    }

    const updatedProps = {
      ...this.props,
      data: feedbackResponsesTableQuery.feedbackResponses || []
    };

    return <FeedbackResponses {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  feedbackResponsesTableQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.feedbackResponses), {
    name: 'feedbackResponsesTableQuery',
    options: ({ queryParams }) => {
      const { search } = queryParams;

      return {
        variables: {
          supplierName: search
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(withTableProps(TendersContainer));
