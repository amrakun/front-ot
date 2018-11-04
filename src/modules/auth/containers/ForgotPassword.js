import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { ForgotPassword } from '../components';
import { alert } from 'modules/common/utils';
import { mutations } from '../graphql';

const ForgotPasswordContainer = (props, { __ }) => {
  const { forgotPasswordMutation } = props;

  const forgotPassword = variables => {
    forgotPasswordMutation({ variables })
      .then(() => {
        alert.success(
          'If your email address exists in the system, an email with password reset instructions will be sent to you',
          __
        );
        props.history.push('/');
      })
      .catch(e => {
        alert.error(e, __);
      });
  };

  const updatedProps = {
    ...props,
    forgotPassword
  };

  return <ForgotPassword {...updatedProps} />;
};

ForgotPasswordContainer.propTypes = {
  forgotPasswordMutation: PropTypes.func,
  history: PropTypes.object
};

ForgotPasswordContainer.contextTypes = {
  __: PropTypes.func
};

export default compose(
  graphql(gql(mutations.forgotPassword), {
    name: 'forgotPasswordMutation'
  })
)(ForgotPasswordContainer);
