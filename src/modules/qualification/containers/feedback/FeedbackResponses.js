import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackResponses } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';
import { withTableProps } from 'modules/common/containers';

class TendersContainer extends React.Component {
  render() {
    const { feedbackResponsesQuery } = this.props;

    if (feedbackResponsesQuery.loading) {
      return <FeedbackResponses loading={true} />;
    }

    const updatedProps = {
      ...this.props,
      data: feedbackResponsesQuery.feedbackResponses || []
    };

    return <FeedbackResponses {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  feedbackResponsesQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.feedbackResponses), {
    name: 'feedbackResponsesQuery',
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
