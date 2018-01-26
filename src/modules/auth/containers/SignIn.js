import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { SignIn } from '../components';
import { mutations } from '../graphql';
import consts from 'consts';
import apolloClient from 'apolloClient';
import { message } from 'antd';

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const { loginMutation } = this.props;
    const { loading } = this.state;

    const login = variables => {
      const { LOGIN_TOKEN_KEY, LOGIN_REFRESH_TOKEN_KEY } = consts;

      this.setState({ loading: true });

      loginMutation({ variables })
        .then(({ data }) => {
          const { token, refreshToken } = data.login;
          // save tokens
          localStorage.setItem(LOGIN_TOKEN_KEY, token);
          localStorage.setItem(LOGIN_REFRESH_TOKEN_KEY, refreshToken);

          apolloClient.resetStore();

          window.location.href = '/';
        })

        .catch(error => {
          message.error(error.message);

          this.setState({ loading: false });
        });
    };

    const updatedProps = {
      ...this.props,
      login,
      loading
    };

    return <SignIn {...updatedProps} />;
  }
}

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
