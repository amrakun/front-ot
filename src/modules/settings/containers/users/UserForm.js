import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { mutations } from '../../graphql';
import { UserForm as UserFormComponent } from '../../components';
import { Loading } from '../../../common/components';

const propTypes = {
  user: PropTypes.object,
  usersAddMutation: PropTypes.func,
  usersEditMutation: PropTypes.func,
  onSuccess: PropTypes.func
};

class UserFormContainer extends React.Component {
  render() {
    const { user, usersAddMutation, usersEditMutation, onSuccess } = this.props;

    if (usersEditMutation.loading || usersAddMutation.loading) {
      return <Loading />;
    }

    const mainAction = doc => {
      const mutation = user ? usersEditMutation : usersAddMutation;
      mutation({ variables: doc }).then(() => {
        onSuccess();
      });
    };

    const updatedProps = {
      ...this.props,
      mainAction
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
  })
)(UserFormContainer);
