import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { QualificationAudit } from '../../components';
import { Loading } from '../../../common/components';
import { queries } from '../../graphql';

const QualificationAuditContainer = ({ usersListQuery }) => {
  if (usersListQuery.loading) {
    return <Loading />;
  }

  const updatedProps = {
    users: usersListQuery.users
  };

  return <QualificationAudit {...updatedProps} />;
};

QualificationAuditContainer.propTypes = {
  usersListQuery: PropTypes.object.isRequired
};

export default compose(
  graphql(gql(queries.users), {
    name: 'usersListQuery',
    options: ({ role }) => {
      return {
        variables: {
          role
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(withRouter(QualificationAuditContainer));
