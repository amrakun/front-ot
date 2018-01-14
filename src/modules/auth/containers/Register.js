import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { Register } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const { registerMutation, history } = this.props;
    const { loading } = this.state;

    const register = variables => {
      this.setState({ loading: true });

      registerMutation({ variables })
        .then(() => {
          message.success(`Confirmation link has been sent to your email`);
          history.push('/sign-in?confirmation');
          this.setState({ loading: false });
        })
        .catch(error => {
          message.error(error.message);
          this.setState({ loading: false });
        });
    };

    const updatedProps = {
      ...this.props,
      register,
      loading
    };

    return <Register {...updatedProps} />;
  }
}

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
