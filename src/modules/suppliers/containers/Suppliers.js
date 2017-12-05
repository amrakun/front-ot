import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { SuppliersList } from '../components';

const SuppliersContainer = props => {
  const { companiesQuery } = props;

  if (companiesQuery.loading) {
    return <SuppliersList loading={true} />;
  }

  return (
    <SuppliersList
      data={companiesQuery.companies}
      pagination={{
        total: companiesQuery.companies.length,
        pageSize: companiesQuery.companies.length,
        current: 1
      }}
      loading={false}
      onChange={(pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
      }
    />
  );
};

SuppliersContainer.propTypes = {
  companiesQuery: PropTypes.object
};

export default graphql(gql(queries.companies), {
  name: 'companiesQuery',
  options: ({ queryParams }) => {
    return {
      variables: {
        page: 200,
        perPage: 20
      },
      notifyOnNetworkStatusChange: true
    };
  }
})(SuppliersContainer);
