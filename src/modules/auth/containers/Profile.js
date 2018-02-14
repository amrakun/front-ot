import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Profile } from '../components';
import { Loading } from '../../common/components';
import { queries, mutations } from '../graphql';
import { message } from 'antd';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const propTypes = {
  currentUserQuery: PropTypes.object.isRequired,
  usersEditProfileMutation: PropTypes.func,
  onSuccess: PropTypes.func,
  intl: intlShape.isRequired
};

const messages = defineMessages({
  text: {
    id: 'successFullyUpdated',
    defaultMessage: 'Successfully updated'
  }
});

const ProfileContainer = props => {
  const { currentUserQuery, usersEditProfileMutation, intl } = props;
  if (currentUserQuery.loading || usersEditProfileMutation.loading) {
    return <Loading />;
  }

  const mainAction = doc => {
    usersEditProfileMutation({ variables: doc })
      .then(() => {
        message.success(intl.formatMessage(messages.text));
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...this.props,
    currentUser: currentUserQuery.currentUser,
    mainAction
  };

  return <Profile {...updatedProps} />;
};

ProfileContainer.propTypes = propTypes;

export default injectIntl(
  compose(
    graphql(gql(queries.currentUser), {
      name: 'currentUserQuery'
    }),
    graphql(gql(mutations.usersEditProfile), {
      name: 'usersEditProfileMutation'
    })
  )(withRouter(ProfileContainer))
);
