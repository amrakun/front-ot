import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { PasswordSubmission } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';

const ResetPasswordContainer = props => {
  const { resetPasswordMutation, history, token } = props;

  const resetPassword = args => {
    console.log(args.password, token);
    resetPasswordMutation({
      variables: {
        newPassword: args.password,
        token
      }
    })
      .then(() => {
        history.push('/sign-in');
        message.success(
          'Your password has been reset, please sign in using your new password'
        );
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    submit: resetPassword,
    reset: true
  };

  return <PasswordSubmission {...updatedProps} />;
};

ResetPasswordContainer.propTypes = {
  token: PropTypes.string,
  resetPasswordMutation: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(
  compose(
    graphql(gql(mutations.resetPassword), {
      name: 'resetPasswordMutation'
    })
  )(ResetPasswordContainer)
);
