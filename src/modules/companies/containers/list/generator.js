import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import { Loading } from 'modules/common/components';
import generateVariables from './generateVariables';

const generator = (Component, query, generateExtraVariables) => {
  class Container extends React.Component {
    render() {
      const { companiesQuery, totalCountQuery } = this.props;

      if (companiesQuery.error || totalCountQuery.error) {
        return null;
      }

      if (companiesQuery.loading || totalCountQuery.loading) {
        return <Loading />;
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

  const options = ({ queryParams }) => {
    let variables = generateVariables(queryParams);

    if (generateExtraVariables) {
      variables = {
        ...variables,
        ...generateExtraVariables(queryParams)
      };
    }

    return {
      variables,
      notifyOnNetworkStatusChange: true
    };
  };

  return compose(
    graphql(gql(queries[query]), {
      name: 'companiesQuery',
      options
    }),

    graphql(gql(queries.companiesTotalCount), {
      name: 'totalCountQuery',
      options
    })
  )(Container);
};

export default generator;
