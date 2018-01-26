import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackResponses } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../../graphql';

class TendersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(pagination) {
    this.setState({ pagination });
  }

  render() {
    const { feedbackResponsesQuery } = this.props;

    if (feedbackResponsesQuery.loading) {
      return <FeedbackResponses loading={true} />;
    }

    const { pagination } = this.state;
    const feedbackResponses = feedbackResponsesQuery.feedbackResponses || [];

    const updatedProps = {
      ...this.props,
      data: feedbackResponses,
      pagination: {
        total: feedbackResponses.length,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      loading: false,
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <FeedbackResponses {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  feedbackResponsesQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.feedbackResponses), {
    name: 'feedbackResponsesQuery'
  })
)(TendersContainer);
