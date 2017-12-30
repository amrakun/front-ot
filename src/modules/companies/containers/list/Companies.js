import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import { CompaniesList } from '../../components';

class CompaniesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter);
    this.setState({ pagination });
  }

  render() {
    const { companiesQuery } = this.props;

    if (companiesQuery.loading) {
      return <CompaniesList loading={true} />;
    }

    const updatedProps = {
      ...this.props,
      data: companiesQuery.companies,
      pagination: {
        total: companiesQuery.companies.length,
        pageSize: companiesQuery.companies.length,
        current: 1
      },
      loading: false,
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <CompaniesList {...updatedProps} />;
  }
}

CompaniesContainer.propTypes = {
  companiesQuery: PropTypes.object
};

export default graphql(gql(queries.companies), {
  name: 'companiesQuery',
  options: ({ queryParams }) => {
    console.log(queryParams);
    return {
      variables: {
        page: 200,
        perPage: 20
      },
      notifyOnNetworkStatusChange: true
    };
  }
})(CompaniesContainer);
