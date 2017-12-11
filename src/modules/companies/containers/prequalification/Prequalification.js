import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { PrequalificationForms } from '../../components';

const PrequalificationContainer = props => {
  let { companyDetailQuery } = props;

  if (companyDetailQuery.loading) {
    return <div />;
  }

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    mutation({ variables: { [name]: doc } })
      .then(() => {
        console.log('Saved');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updatedProps = {
    ...props,
    save,
    company: {
      ...companyDetailQuery.companyDetail
    }
  };
  return <PrequalificationForms {...updatedProps} />;
};

PrequalificationContainer.propTypes = {
  companyDetailQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyPrequalificationDetail), {
    name: 'companyDetailQuery'
  }),

  // mutations
  graphql(gql(mutations.financialInfo), {
    name: 'financialInfoEdit'
  })
)(PrequalificationContainer);
