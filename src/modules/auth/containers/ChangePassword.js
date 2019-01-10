import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { ChangePassword } from '../components';
import { Loading } from '../../common/components';
import { alert } from '../../common/utils';
import { queries, mutations } from '../graphql';

const propTypes = {
  currentUserQuery: PropTypes.object.isRequired,
  usersChangePasswordMutation: PropTypes.func,
  onSuccess: PropTypes.func
};

const ChangePasswordContainer = (props, { __ }) => {
  const { currentUserQuery, usersChangePasswordMutation } = props;

  if (currentUserQuery.loading || usersChangePasswordMutation.loading) {
    return <Loading />;
  }

  const mainAction = doc => {
    usersChangePasswordMutation({ variables: doc })
      .then(() => {
        alert.success('Successfully updated', __);
      })
      .catch(error => {
        alert.error(error, __);
      });
  };

  const updatedProps = {
    ...props,
    currentUser: currentUserQuery.currentUser,
    mainAction
  };

  return <ChangePassword {...updatedProps} />;
};

ChangePasswordContainer.propTypes = propTypes;

ChangePasswordContainer.contextTypes = {
  __: PropTypes.func
};

export default compose(
  graphql(gql(queries.currentUser), {
    name: 'currentUserQuery'
  }),
  graphql(gql(mutations.usersChangePassword), {
    name: 'usersChangePasswordMutation'
  })
)(withRouter(ChangePasswordContainer));
