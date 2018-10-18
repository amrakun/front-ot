import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { PasswordSubmission } from '../components';
import { alert } from 'modules/common/utils';
import { mutations } from '../graphql';

const RegisterContainer = (props, { __ }) => {
  const { confirmRegistrationMutation, history, token } = props;

  const confirmRegistration = variables => {
    const updatedVariables = {
      ...variables,
      token
    };

    confirmRegistrationMutation({ variables: updatedVariables })
      .then(() => {
        alert.success('Welcome!', __);
        history.push('/sign-in?confirmed');
      })
      .catch(error => {
        alert.error(error, __);
      });
  };

  const updatedProps = {
    ...props,
    submit: confirmRegistration
  };

  return <PasswordSubmission {...updatedProps} />;
};

RegisterContainer.propTypes = {
  confirmRegistrationMutation: PropTypes.func,
  history: PropTypes.object,
  token: PropTypes.string
};

RegisterContainer.contextTypes = {
  __: PropTypes.func
};

export default withRouter(
  compose(
    graphql(gql(mutations.confirmRegistration), {
      name: 'confirmRegistrationMutation'
    })
  )(RegisterContainer)
);
