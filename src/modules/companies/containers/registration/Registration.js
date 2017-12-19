import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { RegistrationForms } from '../../components';

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
    company: {
      ...companyByUserQuery.companyByUser
    }
  };
  return <RegistrationForms {...updatedProps} />;
};

RegistrationContainer.propTypes = {
  companyByUserQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery'
  }),

  // mutations
  graphql(gql(mutations.basicInfo), {
    name: 'basicInfoEdit'
  }),
  graphql(gql(mutations.contactInfo), {
    name: 'contactInfoEdit'
  }),
  graphql(gql(mutations.managementTeam), {
    name: 'managementTeamInfoEdit'
  }),
  graphql(gql(mutations.shareholderInfo), {
    name: 'shareholderInfoEdit'
  }),
  graphql(gql(mutations.groupInfo), {
    name: 'groupInfoEdit'
  }),
  graphql(gql(mutations.productsInfo), {
    name: 'productsInfoEdit'
  }),
  graphql(gql(mutations.certificateInfo), {
    name: 'certificateInfoEdit'
  })
)(RegistrationContainer);
