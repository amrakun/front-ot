import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import router from 'modules/common/router';

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

    handleTableChange(pagination, filter, sorter) {
      const { history } = this.props;

      this.setState({ pagination });

      if (sorter.columnKey) {
        const order = sorter.order === 'descend' ? -1 : 1;

        router.setParams(history, {
          sort: `${sorter.columnKey},${order}`
        });
      } else {
        router.removeParams(history, 'sort');
      }
    }

    render() {
      const { companiesQuery } = this.props;
      const { pagination } = this.state;

      if (companiesQuery.loading) {
        return <Component loading={true} />;
      }

      const companies = companiesQuery.companies || [];

      const updatedProps = {
        ...this.props,
        data: companies,
        pagination: {
          total: companies.length,
          pageSize: pagination.pageSize,
          current: pagination.current
        },
        loading: false,
        onChange: (pagination, filters, sorter) =>
          this.handleTableChange(pagination, filters, sorter)
      };

      return <Component {...updatedProps} />;
    }
  }

  Container.propTypes = {
    companiesQuery: PropTypes.object,
    history: PropTypes.object
  };

  return graphql(gql(queries[query]), {
    name: 'companiesQuery',
    options: ({ queryParams }) => {
      const { search, region, productCodes, difotRange, sort } = queryParams;
      const status = queryParams.status || '';

      let difotScore = '';

      if (status && status.includes('byDifotScore')) {
        difotScore = difotRange;
      }

      let sortField = null;
      let sortDirection = null;

      if (sort) {
        const split = sort.split(',');
        sortField = split[0];
        sortDirection = split[1];
      }

      return {
        variables: {
          page: 1,
          perPage: 1,
          search,
          region,
          productCodes,
          difotScore,
          sortField,
          sortDirection,
          includeBlocked: status.includes('includeBlocked'),
          isPrequalified: status.includes('isPrequalified'),
          isProductsInfoValidated: status.includes('isProductsInfoValidated'),
          isQualified: status.includes('isQualified')
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })(Container);
};

export default generator;
