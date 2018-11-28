import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { ProfileEditConfirmation } from '../components';
import { alert } from 'modules/common/utils';
import { queries, mutations } from '../graphql';

const ProfileEditContainer = (props, { __ }) => {
  const {
    confirmProfileEditMutation,
    currentUserQuery,
    token,
    history
  } = props;

  if (currentUserQuery.loading) {
    return null;
  }

  const { currentUser } = currentUserQuery;

  if (!currentUser) {
    history.push('/sign-in');
    return null;
  }

  const confirmProfileEdit = () => {
    confirmProfileEditMutation({ variables: { token } })
      .then(() => {
        alert.success('Success!', __);
      })
      .catch(error => {
        alert.error(error, __);
      });
  };

  const updatedProps = {
    user: currentUser,
    submit: confirmProfileEdit
  };

  return <ProfileEditConfirmation {...updatedProps} />;
};

ProfileEditContainer.propTypes = {
  confirmProfileEditMutation: PropTypes.func,
  currentUserQuery: PropTypes.object,
  history: PropTypes.object,
  token: PropTypes.string
};

ProfileEditContainer.contextTypes = {
  __: PropTypes.func
};

export default compose(
  graphql(gql(mutations.confirmProfileEdit), {
    name: 'confirmProfileEditMutation',
    options: () => ({
      refetchQueries: ['currentUser']
    })
  }),

  graphql(gql(queries.currentUser), {
    name: 'currentUserQuery'
  })
)(ProfileEditContainer);
