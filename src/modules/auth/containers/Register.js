import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { alert } from 'modules/common/utils';
import { Register } from '../components';
import { mutations } from '../graphql';

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
    const { __ } = this.context;

    const register = variables => {
      this.setState({ loading: true });

      registerMutation({ variables })
        .then(() => {
          alert.success(__('Confirmation link has been sent to your email'));
          history.push('/sign-in?confirmation');
        })
        .catch(error => {
          alert.error(error, __);
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

RegisterContainer.contextTypes = {
  __: PropTypes.func
};

export default withRouter(
  compose(
    graphql(gql(mutations.register), {
      name: 'registerMutation'
    })
  )(RegisterContainer)
);
