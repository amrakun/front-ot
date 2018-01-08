import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackDetail } from '../../components';
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
    const { feedbackDetailQuery } = this.props;

    if (feedbackDetailQuery.loading) {
      return <FeedbackDetail loading={true} />;
    }

    const { pagination } = this.state;
    const feedbackDetail = feedbackDetailQuery.feedbackDetail || [];

    const updatedProps = {
      ...this.props,
      data: feedbackDetail,
      pagination: {
        total: feedbackDetail.responses.length,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      loading: false,
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <FeedbackDetail {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  feedbackDetailQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.feedbackResponseDetail), {
    name: 'feedbackDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id }
      };
    }
  })
)(TendersContainer);
