import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { FeedbackResponses } from '../../components';
import { queries } from '../../graphql';
import { exportFile, Loading } from 'modules/common/components';

const TendersContainer = props => {
  const { feedbackResponsesTableQuery } = props;

  if (feedbackResponsesTableQuery.error) {
    return null;
  }

  if (feedbackResponsesTableQuery.loading) {
    return <Loading />;
  }

  const exportResponses = responseIds => {
    exportFile({
      query: queries.feedbackResponsesExport,
      variables: {
        responseIds
      }
    });
  };

  const updatedProps = {
    ...props,
    exportResponses,
    loading: false,
    data: feedbackResponsesTableQuery.feedbackResponses || []
  };

  return <FeedbackResponses {...updatedProps} />;
};

TendersContainer.propTypes = {
  feedbackResponsesTableQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.feedbackResponses), {
    name: 'feedbackResponsesTableQuery',
    options: ({ queryParams }) => {
      return {
        variables: {
          supplierName: queryParams.search || '',
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 15
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(TendersContainer);
