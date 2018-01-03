import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { PrequalificationForms } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const PrequalificationContainer = props => {
  let { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    mutation({ variables: { [name]: doc } })
      .then(() => {
        message.success('Saved');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    company: {
      ...companyByUserQuery.companyByUser
    }
  };
  return <PrequalificationForms {...updatedProps} />;
};

PrequalificationContainer.propTypes = {
  companyByUserQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyPrequalificationDetail), {
    name: 'companyByUserQuery'
  }),

  // mutations
  graphql(gql(mutations.financialInfo), {
    name: 'financialInfoEdit'
  }),

  graphql(gql(mutations.businessInfo), {
    name: 'businessInfoEdit'
  }),

  graphql(gql(mutations.environmentalInfo), {
    name: 'environmentalInfoEdit'
  }),

  graphql(gql(mutations.healthInfo), {
    name: 'healthInfoEdit'
  })
)(PrequalificationContainer);
