import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { UserList } from '../../components';
import { Loading } from '../../../common/components';
import { queries, mutations } from '../../graphql';

const UserListContainer = ({
  usersListQuery,
  usersRemoveMutation,
  resetPasswordMutation
}) => {
  if (usersListQuery.loading) {
    return <Loading />;
  }

  const updatedProps = {
    users: usersListQuery.users,
    removeUser: _id => {
      usersRemoveMutation({ variables: { _id } });
      usersListQuery.refetch();
    },
    resetPassword: _id => {
      resetPasswordMutation({ variables: { _id } });
    }
  };

  return <UserList {...updatedProps} />;
};

UserListContainer.propTypes = {
  usersListQuery: PropTypes.object.isRequired,
  queryParams: PropTypes.object.isRequired,
  usersRemoveMutation: PropTypes.func.isRequired,
  resetPasswordMutation: PropTypes.func.isRequired
};

export default compose(
  graphql(gql(queries.users), {
    name: 'usersListQuery',
    options: ({ queryParams, role }) => {
      return {
        variables: {
          page: queryParams.page ? Number(queryParams.page - 1) : 0,
          perPage: queryParams.perPage,
          role
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),
  graphql(gql(mutations.usersRemove), {
    name: 'usersRemoveMutation'
  }),
  graphql(gql(mutations.resetPassword), {
    name: 'resetPasswordMutation'
  })
  //   graphql(gql(queries.totalUserCount), {
  //     name: 'totalUserCountQuery',
  //   }),
)(withRouter(UserListContainer));
