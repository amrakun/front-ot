import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';

const generator = (Component, query) => {
  class Container extends React.Component {
    render() {
      const { companiesQuery, totalCountQuery } = this.props;

      if (companiesQuery.loading || totalCountQuery.loading) {
        return <Component loading={true} />;
      }

      const companies = companiesQuery.companies || [];
      const totalCount = totalCountQuery.companiesTotalCount || 0;

      const updatedProps = {
        ...this.props,
        data: companies,
        totalCount,
        loading: false
      };

      return <Component {...updatedProps} />;
    }
  }

  Container.propTypes = {
    companiesQuery: PropTypes.object,
    totalCountQuery: PropTypes.object,
    queryParams: PropTypes.object,
    history: PropTypes.object
  };

  const generateVariables = queryParams => {
    const {
      search,
      region,
      productCodes,
      difotRange,
      sort,
      page,
      perPage,
      includeBlocked,
      isPrequalified,
      isProductsInfoValidated,
      isQualified
    } = queryParams;
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
      page: page || 1,
      perPage: perPage || 15,
      search,
      region,
      productCodes,
      difotScore,
      sortField,
      sortDirection,
      includeBlocked,
      isPrequalified,
      isProductsInfoValidated,
      isQualified
    };
  };

  return compose(
    graphql(gql(queries[query]), {
      name: 'companiesQuery',
      options: ({ queryParams }) => {
        return {
          variables: generateVariables(queryParams),
          notifyOnNetworkStatusChange: true
        };
      }
    }),

    graphql(gql(queries.companiesTotalCount), {
      name: 'totalCountQuery',
      options: ({ queryParams }) => {
        return {
          variables: generateVariables(queryParams),
          notifyOnNetworkStatusChange: true
        };
      }
    })
  )(Container);
};

export default generator;
