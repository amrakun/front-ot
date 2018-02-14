import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { PasswordSubmission } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  successResetPassword: {
    id: 'successResetPassword',
    defaultMessage:
      'Your password has been reset, please sign in using your new password'
  }
});

const ResetPasswordContainer = props => {
  const { resetPasswordMutation, history, token, intl } = props;

  const resetPassword = args => {
    resetPasswordMutation({
      variables: {
        newPassword: args.password,
        token
      }
    })
      .then(() => {
        history.push('/sign-in');
        message.success(intl.formatMessage(messages.successResetPassword));
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
  history: PropTypes.object,
  intl: intlShape.isRequired
};

export default injectIntl(
  withRouter(
    compose(
      graphql(gql(mutations.resetPassword), {
        name: 'resetPasswordMutation'
      })
    )(ResetPasswordContainer)
  )
);
