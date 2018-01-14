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
    const { feedbacksQuery } = this.props;

    if (feedbacksQuery.loading) {
      return <FeedbackResponses loading={true} />;
    }

    const { pagination } = this.state;
    const feedbacks = feedbacksQuery.feedbacks || [];

    const updatedProps = {
      ...this.props,
      data: feedbacks,
      pagination: {
        total: feedbacks.length,
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
  feedbacksQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.feedbacks), {
    name: 'feedbacksQuery'
  })
)(TendersContainer);
