import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../graphql';
import { Loading } from 'modules/common/components';
import { SupplierDashboard } from '../components';

const SupplierDashboardContainer = props => {
  const { companyByUserQuery, location } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  if (location.search === '?refetch') {
    companyByUserQuery.refetch;
  }

  const updatedProps = {
    ...props,
    data: {
      ...companyByUserQuery.companyByUser
    }
  };

  return <SupplierDashboard {...updatedProps} />;
};

SupplierDashboardContainer.propTypes = {
  companyByUserQuery: PropTypes.object,
  location: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery'
  })
)(SupplierDashboardContainer);
