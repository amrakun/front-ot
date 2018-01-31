import React from 'react';
import PropTypes from 'prop-types';
import { PhysicalAudits } from '../../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { withTableProps } from 'modules/common/containers';
import { message } from 'antd';

class PhysicalAuditsContainer extends React.Component {
  render() {
    const {
      physicalAuditsQuery,
      physicalAuditsEdit,
      physicalAuditsRemove
    } = this.props;

    if (physicalAuditsQuery.loading) {
      return <PhysicalAudits loading={true} />;
    }

    const editPhysicalAudit = variables => {
      physicalAuditsEdit({ variables })
        .then(() => {
          message.success('Successfully edited physical audit');
          physicalAuditsQuery.refetch();
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const removePhysicalAudit = _id => {
      physicalAuditsRemove({ variables: { _id } })
        .then(() => {
          message.success('Successfully remove physical audit');
          physicalAuditsQuery.refetch();
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const updatedProps = {
      ...this.props,
      editPhysicalAudit,
      removePhysicalAudit,
      data: physicalAuditsQuery.physicalAudits || []
    };

    return <PhysicalAudits {...updatedProps} />;
  }
}

PhysicalAuditsContainer.propTypes = {
  physicalAuditsQuery: PropTypes.object,
  physicalAuditsEdit: PropTypes.func,
  physicalAuditsRemove: PropTypes.func
};

export default compose(
  graphql(gql(queries.physicalAudits), {
    name: 'physicalAuditsQuery'
  }),

  graphql(gql(mutations.physicalAuditsEdit), {
    name: 'physicalAuditsEdit'
  }),

  graphql(gql(mutations.physicalAuditsRemove), {
    name: 'physicalAuditsRemove'
  })
)(withTableProps(PhysicalAuditsContainer));
