import React from 'react';
import { message } from 'antd';
import { gql, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { SubmitFeedback } from '../../components';
import { mutations, queries } from '../../graphql';
import { Loading } from 'modules/common/components';

class FeedbackContainer extends React.Component {
  render() {
    const {
      feedbackDetailQuery,
      addFeedbackResponseMutation,
      history
    } = this.props;

    if (feedbackDetailQuery.loading) {
      return <Loading />;
    }

    const { feedbackDetail } = feedbackDetailQuery;

    const addFeedbackResponse = args => {
      addFeedbackResponseMutation({
        variables: {
          ...args,
          supplierId: this.context.currentUser.companyId,
          feedbackId: feedbackDetail._id
        }
      })
        .then(() => {
          message.success('Successfully submitted');
          history.push('/rfq-and-eoi?refetch');
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      save: addFeedbackResponse,
      data: feedbackDetail,
      forSubmit: true
    };

    return <SubmitFeedback {...extendedProps} />;
  }
}

FeedbackContainer.propTypes = {
  feedbackDetailQuery: PropTypes.object,
  addFeedbackResponseMutation: PropTypes.func,
  history: PropTypes.object
};

FeedbackContainer.contextTypes = {
  currentUser: PropTypes.object
};

export default compose(
  graphql(gql(queries.feedbackDetail), {
    name: 'feedbackDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id }
      };
    }
  }),

  graphql(gql(mutations.addFeedbackResponse), {
    name: 'addFeedbackResponseMutation'
  })
)(FeedbackContainer);
