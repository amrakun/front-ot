import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { ForgotPassword } from '../components';
import { mutations } from '../graphql';
import { message, notification, Icon } from 'antd';

const ForgotPasswordContainer = props => {
  const { forgotPasswordMutation } = props;

  const forgotPassword = variables => {
    forgotPasswordMutation({ variables })
      .then(() => {
        notification.open({
          message: 'Password reset information has been sent to your email.',
          icon: <Icon type="mail" style={{ color: 'rgb(0,153,168)' }} />,
          duration: 0
        });
        props.history.push('/');
      })
      .catch(error => {
        message.error(error.message);
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

export default compose(
  graphql(gql(mutations.forgotPassword), {
    name: 'forgotPasswordMutation'
  })
)(ForgotPasswordContainer);
