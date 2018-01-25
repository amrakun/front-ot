import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { QualificationAudit } from '../../components';
import { Loading } from '../../../common/components';
import { queries, mutations } from '../../graphql';
import { message } from 'antd';

const QualificationAuditContainer = ({
  usersListQuery,
  configsSaveAuditDowMutation,
  configsSaveImprovementPlanDowMutation
}) => {
  if (
    usersListQuery.loading ||
    configsSaveAuditDowMutation.loading ||
    configsSaveImprovementPlanDowMutation.loading
  ) {
    return <Loading />;
  }

  const mainAction = auditDoc => {
    console.log(auditDoc);
    configsSaveAuditDowMutation({ variables: { doc: auditDoc } }).then(() => {
      message.success('Saved Successfully');
      // configsSaveImprovementPlanDowMutation({ variables: { impDoc } }).then(
      //   () => {
      //     message.success('Saved Successfully');
      //   }
      // );
    });
  };

  const updatedProps = {
    ...this.props,
    users: usersListQuery.users,
    mainAction
  };

  return <QualificationAudit {...updatedProps} />;
};

QualificationAuditContainer.propTypes = {
  usersListQuery: PropTypes.object.isRequired,
  configsSaveAuditDowMutation: PropTypes.func.isRequired,
  configsSaveImprovementPlanDowMutation: PropTypes.func.isRequired
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
  }),
  graphql(gql(mutations.configsSaveAuditDow), {
    name: 'configsSaveAuditDowMutation'
  }),
  graphql(gql(mutations.configsSaveImprovementPlanDow), {
    name: 'configsSaveImprovementPlanDowMutation'
  })
)(withRouter(QualificationAuditContainer));
