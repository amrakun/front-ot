import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from 'modules/common/components';
import { alert } from 'modules/common/utils';
import router from 'modules/common/router';
import { UserList } from '../../components';
import { queries, mutations } from '../../graphql';

const UserListContainer = ({
  usersListQuery,
  usersTotalCountQuery,
  usersToggleStateMutation,
  history,
}) => {
  if (usersListQuery.error || usersTotalCountQuery.error) {
    return null;
  }

  if (usersListQuery.loading || usersTotalCountQuery.loading) {
    return <Loading />;
  }

  const updatedProps = {
    users: usersListQuery.users,
    totalCount: usersTotalCountQuery.usersTotalCount || 0,
    toggleState: _id => {
      usersToggleStateMutation({ variables: { _id } })
        .then(() => {
          usersListQuery.refetch();
          alert.success('User state succesfully changed.');
        })
        .catch(e => {
          alert.error(e.message);
        });
    },
    refetchUsers: () => {
      usersListQuery.refetch();
    },
    numbering: router.getParam(history, 'page')
      ? 10 * (Number(router.getParam(history, 'page')) - 1) + 1
      : 1,
  };

  return <UserList {...updatedProps} />;
};

UserListContainer.propTypes = {
  usersListQuery: PropTypes.object.isRequired,
  usersTotalCountQuery: PropTypes.object.isRequired,
  queryParams: PropTypes.object.isRequired,
  usersToggleStateMutation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  graphql(gql(queries.users), {
    name: 'usersListQuery',
    options: ({ queryParams }) => {
      const { search } = queryParams;

      return {
        variables: {
          page: queryParams.page ? Number(queryParams.page) : 1,
          perPage: queryParams.perPage ? Number(queryParams.perPage) : 10,
          role: 'admin',
          isActive: queryParams.isActive || 'true',
          search,
        },
        notifyOnNetworkStatusChange: true,
      };
    },
  }),
  graphql(gql(mutations.usersToggleState), {
    name: 'usersToggleStateMutation',
  }),
  graphql(gql(queries.usersTotalCount), {
    name: 'usersTotalCountQuery',
    options: ({ queryParams }) => ({
      variables: {
        search: queryParams.search,
      },
    }),
  })
)(withRouter(UserListContainer));
