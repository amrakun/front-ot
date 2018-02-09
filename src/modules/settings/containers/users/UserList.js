import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { UserList } from '../../components';
import { Loading } from '../../../common/components';
import router from '../../../common/router';
import { queries, mutations } from '../../graphql';

const UserListContainer = ({
  usersListQuery,
  usersTotalCountQuery,
  usersRemoveMutation,
  history
}) => {
  if (usersListQuery.loading) {
    return <Loading />;
  }

  const updatedProps = {
    users: usersListQuery.users,
    usersTotalCountQuery: usersTotalCountQuery.usersTotalCount
      ? usersTotalCountQuery.usersTotalCount
      : 0,
    removeUser: _id => {
      usersRemoveMutation({ variables: { _id } }).then(() => {
        usersListQuery.refetch();
      });
    },
    setPaginationParams: ({ page }) => {
      router.setParams(history, { page });
    },
    page: router.getParam(history, 'page')
      ? Number(router.getParam(history, 'page'))
      : 1,
    refetchUsers: () => {
      usersListQuery.refetch();
    },
    numbering: router.getParam(history, 'page')
      ? 10 * (Number(router.getParam(history, 'page')) - 1) + 1
      : 1
  };

  return <UserList {...updatedProps} />;
};

UserListContainer.propTypes = {
  usersListQuery: PropTypes.object.isRequired,
  usersTotalCountQuery: PropTypes.object.isRequired,
  queryParams: PropTypes.object.isRequired,
  usersRemoveMutation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  graphql(gql(queries.users), {
    name: 'usersListQuery',
    options: ({ queryParams, role }) => {
      const { search } = queryParams;
      return {
        variables: {
          page: queryParams.page ? Number(queryParams.page) : 1,
          perPage: 10,
          role,
          search
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),
  graphql(gql(mutations.usersRemove), {
    name: 'usersRemoveMutation'
  }),
  graphql(gql(queries.usersTotalCount), {
    name: 'usersTotalCountQuery'
  })
)(withRouter(UserListContainer));
