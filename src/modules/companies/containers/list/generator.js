import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { queries } from '../../graphql';

const generator = (Component, query) => {
  class Container extends React.Component {
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

    handleTableChange(pagination) {
      this.setState({ pagination });
    }

    render() {
      const { companiesQuery } = this.props;

      if (companiesQuery.loading) {
        return <Component loading={true} />;
      }

      const companies = companiesQuery.companies || [];

      const updatedProps = {
        ...this.props,
        data: companies,
        pagination: {
          total: companies.length,
          pageSize: companies.length,
          current: 1
        },
        loading: false,
        onChange: (pagination, filters, sorter) =>
          this.handleTableChange(pagination, filters, sorter)
      };

      return <Component {...updatedProps} />;
    }
  }

  Container.propTypes = {
    companiesQuery: PropTypes.object
  };

  return graphql(gql(queries[query]), {
    name: 'companiesQuery',
    options: ({ queryParams }) => {
      return {
        variables: {
          page: 200,
          perPage: 20,
          search: queryParams.search,
          region: queryParams.region,
          status: queryParams.status,
          productCodes: queryParams.productCodes
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })(Container);
};

export default generator;
