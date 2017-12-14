import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { Register } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';

const RegisterContainer = props => {
  const { registerMutation } = props;

  const register = variables => {
    registerMutation({ variables })
      .then(({ data }) => {
        message.success(`Successful ${data.register.email}`);
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
