import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { alert } from 'modules/common/utils';
import { ResendConfirmationLink } from '../components';
import { mutations } from '../graphql';

class ResendConfirmationLinkContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const { resendConfirmationLinkMutation, history } = this.props;
    const { loading } = this.state;
    const { __ } = this.context;

    const resendConfirmationLink = variables => {
      this.setState({ loading: true });

      resendConfirmationLinkMutation({ variables })
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
      resendConfirmationLink,
      loading
    };

    return <ResendConfirmationLink {...updatedProps} />;
  }
}

ResendConfirmationLinkContainer.propTypes = {
  resendConfirmationLinkMutation: PropTypes.func,
  history: PropTypes.object
};

ResendConfirmationLinkContainer.contextTypes = {
  __: PropTypes.func
};

export default withRouter(
  compose(
    graphql(gql(mutations.resendConfirmationLink), {
      name: 'resendConfirmationLinkMutation'
    })
  )(ResendConfirmationLinkContainer)
);
