import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { Certificate } from '../../components';
import { message } from 'antd';
import { Loading } from 'modules/common/components';

const RegistrationContainer = props => {
  const { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  const save = doc => {
    const { certificateInfoEdit, history } = props;
    console.log(doc);

    certificateInfoEdit({ variables: { certificateInfo: doc } })
      .then(() => {
        message.success('Succesfully saved');
        history.push('/');
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
