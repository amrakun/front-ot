import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { Register } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';

const RegisterContainer = props => {
  const { registerMutation, history } = props;

  const register = variables => {
    registerMutation({ variables })
      .then(() => {
        message.success(`Confirmation link has been sent to your email`);
        history.push('/sign-in?confirmation');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    register
  };

  return <Register {...updatedProps} />;
};

RegisterContainer.propTypes = {
  registerMutation: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(
  compose(
    graphql(gql(mutations.register), {
      name: 'registerMutation'
    })
  )(RegisterContainer)
);
