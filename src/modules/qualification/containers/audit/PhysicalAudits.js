import React from 'react';
import PropTypes from 'prop-types';
import { PhysicalAudits } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { message } from 'antd';

class PhysicalAuditsContainer extends React.Component {
  render() {
    const {
      physicalAuditsTableQuery,
      physicalAuditsCountQuery,
      physicalAuditsEdit,
      physicalAuditsRemove
    } = this.props;

    if (physicalAuditsTableQuery.loading || physicalAuditsCountQuery.loading) {
      return <PhysicalAudits loading={true} />;
    }

    const editPhysicalAudit = variables => {
      physicalAuditsEdit({ variables })
        .then(() => {
          message.success('Successfully edited physical audit');
          physicalAuditsTableQuery.refetch();
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const removePhysicalAudit = _id => {
      physicalAuditsRemove({ variables: { _id } })
        .then(() => {
          message.success('Successfully remove physical audit');
          physicalAuditsTableQuery.refetch();
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const updatedProps = {
      ...this.props,
      editPhysicalAudit,
      removePhysicalAudit,
      loading: false,
      data: physicalAuditsTableQuery.physicalAudits,
      totalCount: physicalAuditsCountQuery.totalPhysicalAudits
    };

    return <PhysicalAudits {...updatedProps} />;
  }
}

PhysicalAuditsContainer.propTypes = {
  physicalAuditsTableQuery: PropTypes.object,
  physicalAuditsCountQuery: PropTypes.object,
  physicalAuditsEdit: PropTypes.func,
  physicalAuditsRemove: PropTypes.func
};

export default compose(
  graphql(gql(queries.physicalAudits), {
    name: 'physicalAuditsTableQuery',
    options: ({ queryParams }) => {
      const params = queryParams || {};
      return {
        variables: {
          page: params.page || 1,
          perPage: params.perPage || 15,
          supplierSearch: params.search
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(queries.totalPhysicalAudits), {
    name: 'physicalAuditsCountQuery',
    options: ({ queryParams }) => {
      const params = queryParams || {};
      return {
        variables: {
          supplierSearch: params.search
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.physicalAuditsEdit), {
    name: 'physicalAuditsEdit'
  }),

  graphql(gql(mutations.physicalAuditsRemove), {
    name: 'physicalAuditsRemove'
  })
)(PhysicalAuditsContainer);
