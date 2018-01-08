import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import Popup from '../../components/searcher/Popup';

const PopupContainer = props => {
  const suppliers = props.companiesQuery.companies || [];

  return <Popup {...{ ...props, suppliers }} />;
};

PopupContainer.propTypes = {
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
)(PopupContainer);
