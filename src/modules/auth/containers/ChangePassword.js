import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { ChangePassword } from '../components';
import { Loading } from '../../common/components';
import { alert } from '../../common/utils';
import { queries, mutations } from '../graphql';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const propTypes = {
  currentUserQuery: PropTypes.object.isRequired,
  usersChangePasswordMutation: PropTypes.func,
  onSuccess: PropTypes.func,
  intl: intlShape.isRequired
};

const messages = defineMessages({
  text: {
    id: 'successFullyUpdated',
    defaultMessage: 'Successfully updated'
  }
});

const ChangePasswordContainer = props => {
  const { currentUserQuery, usersChangePasswordMutation, intl } = props;

  if (currentUserQuery.loading || usersChangePasswordMutation.loading) {
    return <Loading />;
  }

  const mainAction = doc => {
    usersChangePasswordMutation({ variables: doc })
      .then(() => {
        alert.success(intl.formatMessage(messages.text));
      })
      .catch(error => {
        alert.error(error);
      });
  };

  const updatedProps = {
    ...this.props,
    currentUser: currentUserQuery.currentUser,
    mainAction
  };

  return <ChangePassword {...updatedProps} />;
};

ChangePasswordContainer.propTypes = propTypes;
ChangePasswordContainer.contextTypes = {
  formatMessage: PropTypes.func
};

export default injectIntl(
  compose(
    graphql(gql(queries.currentUser), {
      name: 'currentUserQuery'
    }),
    graphql(gql(mutations.usersChangePassword), {
      name: 'usersChangePasswordMutation'
    })
  )(withRouter(ChangePasswordContainer))
);
