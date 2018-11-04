import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { alert } from 'modules/common/utils';
import { SignIn } from '../components';
import { mutations } from '../graphql';
import apolloClient from 'apolloClient';

class SignInContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      chooseLoginAs: null
    };
  }

  render() {
    const { loginMutation } = this.props;
    const { loading, chooseLoginAs } = this.state;
    const { __ } = this.context;

    const login = variables => {
      this.setState({ loading: true });

      loginMutation({ variables })
        .then(({ data }) => {
          const { status, delegatedUser, user } = data.login;

          if (status === 'chooseLoginAs') {
            return this.setState({
              chooseLoginAs: { loginParams: variables, delegatedUser, user }
            });
          }

          apolloClient.resetStore();

          window.location.href = '/';
        })

        .catch(error => {
          alert.error(error, __);

          this.setState({ loading: false });
        });
    };

    const updatedProps = {
      ...this.props,
      login,
      chooseLoginAs,
      loading
    };

    return <SignIn {...updatedProps} />;
  }
}

SignInContainer.propTypes = {
  loginMutation: PropTypes.func,
  history: PropTypes.object
};

SignInContainer.contextTypes = {
  __: PropTypes.func
};

export default withRouter(
  compose(
    graphql(gql(mutations.login), {
      name: 'loginMutation'
    })
  )(SignInContainer)
);
