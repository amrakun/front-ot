import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { message } from 'antd';
import { CapacityBuilding } from '../components';
import { mutations } from '../graphql';
import { generator } from 'modules/companies/containers';

class CapacityBuildingContainer extends React.Component {
  render() {
    const { companiesQuery, toggleStateMutation } = this.props;

    const toggleState = supplierId => {
      toggleStateMutation({ variables: { supplierId } })
        .then(() => {
          message.success('Success');
          companiesQuery.refetch();
        })

        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      toggleState
    };

    return <CapacityBuilding {...extendedProps} />;
  }
}

CapacityBuildingContainer.propTypes = {
  toggleStateMutation: PropTypes.func,
  companiesQuery: PropTypes.object
};

const WithData = graphql(gql(mutations.togglePrequalificationState), {
  name: 'toggleStateMutation'
})(CapacityBuildingContainer);

export default generator(WithData, 'capacityBuilding');
