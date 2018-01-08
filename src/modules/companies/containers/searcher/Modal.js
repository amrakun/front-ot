import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import Modal from '../../components/searcher/Modal';

const ModalContainer = props => {
  const suppliers = props.companiesQuery.companies || [];

  return <Modal {...{ ...props, suppliers }} />;
};

ModalContainer.propTypes = {
  companiesQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.simpleCompanies), {
    name: 'companiesQuery'
  })
)(ModalContainer);
