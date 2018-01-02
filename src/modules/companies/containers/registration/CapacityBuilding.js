import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { Certificate } from '../../components';
import { message } from 'antd';

const RegistrationContainer = props => {
  const { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <div>Loading</div>;
  }

  const save = (name, doc) => {
    const { certificateInfoEdit } = props;

    certificateInfoEdit({ variables: { [name]: doc } })
      .then(() => {
        message.success('Succesfully saved');
      })
      .catch(error => {
        message.error(error.message);
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
