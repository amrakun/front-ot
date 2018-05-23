import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import generateVariables from './generateVariables';

const generator = (Component, query) => {
  class Container extends React.Component {
    render() {
      const { companiesQuery, totalCountQuery, queryParams } = this.props;

      if (companiesQuery.loading || totalCountQuery.loading) {
        return <Component loading={true} queryParams={queryParams} />;
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
