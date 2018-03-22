import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../graphql';
import Searcher from '../components/Searcher';

const SearcherContainer = props => {
  const suppliers = props.companiesQuery.companies || [];

  return <Searcher {...{ ...props, suppliers }} />;
};

SearcherContainer.propTypes = {
  companiesQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.simpleCompanies), {
    name: 'companiesQuery',
    options: ({ searchValue }) => {
      return {
        variables: { search: searchValue }
      };
    }
  })
)(SearcherContainer);
