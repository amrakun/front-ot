import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { ForgotPassword } from '../components';
import { mutations } from '../graphql';
import { message, notification, Icon } from 'antd';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  resetInformation: {
    id: 'resetInformation',
    defaultMessage: 'Password reset information has been sent to your email'
  }
});

const ForgotPasswordContainer = props => {
  const { forgotPasswordMutation, intl } = props;

  const forgotPassword = variables => {
    forgotPasswordMutation({ variables })
      .then(() => {
        notification.open({
          message: intl.formatMessage(messages.resetInformation),
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
  history: PropTypes.object,
  intl: intlShape.isRequired
};

export default injectIntl(
  compose(
    graphql(gql(mutations.forgotPassword), {
      name: 'forgotPasswordMutation'
    })
  )(ForgotPasswordContainer)
);
