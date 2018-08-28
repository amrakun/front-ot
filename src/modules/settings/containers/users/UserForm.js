import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { compose, gql, graphql } from 'react-apollo';
import { alert } from 'modules/common/utils';
import { mutations, queries } from '../../graphql';
import { UserForm as UserFormComponent } from '../../components';
import { Loading } from '../../../common/components';
import permissionTable from '../../permissionTable';

const propTypes = {
  user: PropTypes.object,
  usersAddMutation: PropTypes.func,
  usersEditMutation: PropTypes.func,
  modulePermissionsQuery: PropTypes.object,
  onSuccess: PropTypes.func.isRequired
};

class UserFormContainer extends React.Component {
  render() {
    const {
      user,
      usersAddMutation,
      usersEditMutation,
      onSuccess,
      modulePermissionsQuery
    } = this.props;

    if (
      usersEditMutation.loading ||
      usersAddMutation.loading ||
      modulePermissionsQuery.loading
    ) {
      return <Loading />;
    }

    const modulePermissions = modulePermissionsQuery.modulePermissions,
      permissions = [];

    for (let module of modulePermissions) {
      const moduleName = module.name;
      const treeBranch = { label: moduleName, children: [] };

      for (let permission of module.permissions) {
        treeBranch.children.push({
          label: permissionTable[permission],
          value: permission,
          key: permission
        });
      }

      permissions.push(treeBranch);
    }

    const mainAction = doc => {
      const mutation = user ? usersEditMutation : usersAddMutation;
      const messageText = user
        ? 'User succesfully edited.'
        : 'User succesfully added.';

      mutation({ variables: doc })
        .then(() => {
          onSuccess();
          message.success(messageText);
        })
        .catch(error => {
          alert.error(error);
        });
    };

    const updatedProps = {
      ...this.props,
      mainAction,
      permissions
    };
    return <UserFormComponent {...updatedProps} />;
  }
}

UserFormContainer.propTypes = propTypes;

export default compose(
  graphql(gql(mutations.usersAdd), {
    name: 'usersAddMutation'
  }),
  graphql(gql(mutations.usersEdit), {
    name: 'usersEditMutation'
  }),
  graphql(gql(queries.modulePermissions), {
    name: 'modulePermissionsQuery'
  })
)(UserFormContainer);
