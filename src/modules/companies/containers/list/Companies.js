import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import { CompaniesList } from '../../components';

const CompaniesContainer = props => {
  const { companiesQuery } = props;

  if (companiesQuery.loading) {
    return <CompaniesList loading={true} />;
  }

  return (
    <CompaniesList
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

CompaniesContainer.propTypes = {
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
})(CompaniesContainer);
