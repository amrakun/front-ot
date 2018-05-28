import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { Loading, exportFile } from 'modules/common/components';
import { queries as companyQueries } from 'modules/companies/graphql';
import { SupplierDashboard } from '../components';
import { queries } from '../graphql';

const SupplierDashboardContainer = props => {
  const { companyByUserQuery, location, history } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  const exportPreq = () => {
    exportFile({
      query: companyQueries.exportCurrentCompanyPrequalification
    });
  };

  if (location.search === '?refetch') {
    companyByUserQuery.refetch();
    history.push({ location: null });
  }

  const updatedProps = {
    ...props,
    exportPreq,
    data: {
      ...companyByUserQuery.companyByUser
    }
  };

  return <SupplierDashboard {...updatedProps} />;
};

SupplierDashboardContainer.propTypes = {
  companyByUserQuery: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery'
  })
)(SupplierDashboardContainer);
