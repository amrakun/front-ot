import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { SignIn } from '../components';
import { mutations } from '../graphql';
import consts from 'consts';
import apolloClient from 'apolloClient';
import { message } from 'antd';

const SignInContainer = props => {
  const { loginMutation, history } = props;

  const login = variables => {
    const { LOGIN_TOKEN_KEY, LOGIN_REFRESH_TOKEN_KEY } = consts;

    loginMutation({ variables })
      .then(({ data }) => {
        const { token, refreshToken } = data.login;
        console.log(token, refreshToken);
        // save tokens
        localStorage.setItem(LOGIN_TOKEN_KEY, token);
        localStorage.setItem(LOGIN_REFRESH_TOKEN_KEY, refreshToken);

        apolloClient.resetStore();

        history.push('/');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    login
  };

  return <SignIn {...updatedProps} />;
};

SignInContainer.propTypes = {
  loginMutation: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(
  compose(
    graphql(gql(mutations.login), {
      name: 'loginMutation'
    })
  )(SignInContainer)
);
