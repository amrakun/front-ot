import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { PreQualification } from '../../components';
import { Loading } from '../../../common/components';
import { mutations, queries } from '../../graphql';
import { message } from 'antd';

const PreQualificatoinContainer = ({
  usersListQuery,
  configsSavePrequalificationDowMutation
}) => {
  if (
    configsSavePrequalificationDowMutation.loading ||
    usersListQuery.loading
  ) {
    return <Loading />;
  }

  const mainAction = doc => {
    configsSavePrequalificationDowMutation({ variables: { doc } }).then(() => {
      message.success('Saved Successfully');
    });
  };

  const updatedProps = {
    ...this.props,
    users: usersListQuery.users,
    mainAction
  };

  return <PreQualification {...updatedProps} />;
};

PreQualificatoinContainer.propTypes = {
  usersListQuery: PropTypes.object.isRequired,
  configsSavePrequalificationDowMutation: PropTypes.func.isRequired
};

export default compose(
  graphql(gql(queries.users), {
    name: 'usersListQuery',
    options: () => {
      return {
        notifyOnNetworkStatusChange: true
      };
    }
  }),
  graphql(gql(mutations.configsSavePrequalificationDow), {
    name: 'configsSavePrequalificationDowMutation'
  })
)(withRouter(PreQualificatoinContainer));
