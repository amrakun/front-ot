import React from 'react';
import { message } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Feedback } from '../../components';
import { mutations } from '../../graphql';
import generator from './generator';

class FeedbackContainer extends React.Component {
  render() {
    const { companiesQuery, addFeedbackMutation } = this.props;

    const addFeedback = args => {
      console.log(args);
      addFeedbackMutation({
        variables: {
          closeDate: args.feedbackCloseDate,
          supplierIds: args.selectedCompanies,
          content: args.feedbackContent
        }
      })
        .then(() => {
          message.success('Successfully sent success feedbacks');
          companiesQuery.refetch();
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      addFeedback
    };

    return <Feedback {...extendedProps} />;
  }
}

FeedbackContainer.propTypes = {
  companiesQuery: PropTypes.object,
  addFeedbackMutation: PropTypes.func
};

const WithData = graphql(gql(mutations.addFeedback), {
  name: 'addFeedbackMutation'
})(FeedbackContainer);

export default generator(WithData, 'feedback');
