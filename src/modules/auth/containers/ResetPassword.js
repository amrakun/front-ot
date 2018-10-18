import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { PasswordSubmission } from '../components';
import { alert } from 'modules/common/utils';
import { mutations } from '../graphql';

const ResetPasswordContainer = (props, context) => {
  const { resetPasswordMutation, history, token } = props;
  const { __ } = context;

  const resetPassword = args => {
    resetPasswordMutation({
      variables: {
        newPassword: args.password,
        token
      }
    })
      .then(() => {
        history.push('/sign-in');
        alert.success(
          __(
            'Your password has been reset, please sign in using your new password'
          )
        );
      })
      .catch(error => {
        alert.error(error, __);
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

ResetPasswordContainer.contextTypes = {
  __: PropTypes.func
};
