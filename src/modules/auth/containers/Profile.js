import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Profile } from '../components';
import { Loading } from '../../common/components';
import { alert } from '../../common/utils';
import { queries, mutations } from '../graphql';

const ProfileContainer = (props, { __ }) => {
  const { currentUserQuery, usersEditProfileMutation } = props;

  if (currentUserQuery.loading || usersEditProfileMutation.loading) {
    return <Loading />;
  }

  const mainAction = doc => {
    usersEditProfileMutation({ variables: doc })
      .then(({ data: { usersEditProfile } }) => {
        if (usersEditProfile.temporarySecureInformation) {
          alert.success('Check your email to confirm', __);
        } else {
          alert.success('Successfully updated', __);
        }
      })
      .catch(error => {
        alert.error(error.message, __);
      });
  };

  const updatedProps = {
    ...props,
    currentUser: currentUserQuery.currentUser,
    mainAction
  };

  return <Profile {...updatedProps} />;
};

ProfileContainer.propTypes = {
  currentUserQuery: PropTypes.object.isRequired,
  usersEditProfileMutation: PropTypes.func,
  onSuccess: PropTypes.func
};

ProfileContainer.contextTypes = {
  __: PropTypes.func
};

export default compose(
  graphql(gql(queries.currentUser), {
    name: 'currentUserQuery'
  }),
  graphql(gql(mutations.usersEditProfile), {
    name: 'usersEditProfileMutation'
  })
)(withRouter(ProfileContainer));
