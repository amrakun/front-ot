import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { Certificate } from '../../components';

const RegistrationContainer = props => {
  let { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <div>Loading</div>;
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
    data: {
      ...companyByUserQuery.companyByUser.certificateInfo
    }
  };

  return <Certificate {...updatedProps} />;
};

RegistrationContainer.propTypes = {
  companyByUserQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery'
  }),

  // mutations
  graphql(gql(mutations.certificateInfo), {
    name: 'certificateInfoEdit'
  })
)(RegistrationContainer);
