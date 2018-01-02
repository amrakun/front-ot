import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { RegisterConfirmation } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';

const RegisterContainer = props => {
  const { confirmRegistrationMutation, history, token } = props;

  const confirmRegistration = variables => {
    const updatedVariables = {
      ...variables,
      token
    };

    confirmRegistrationMutation({ variables: updatedVariables })
      .then(() => {
        message.success(`Welcome!`);
        history.push('/sign-in?confirmed');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    confirmRegistration
  };

  return <RegisterConfirmation {...updatedProps} />;
};

RegisterContainer.propTypes = {
  confirmRegistrationMutation: PropTypes.func,
  history: PropTypes.object,
  token: PropTypes.string
};

export default withRouter(
  compose(
    graphql(gql(mutations.confirmRegistration), {
      name: 'confirmRegistrationMutation'
    })
  )(RegisterContainer)
);
