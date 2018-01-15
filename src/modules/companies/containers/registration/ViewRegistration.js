import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import { RegistrationForms } from '../../components';
import { Loading } from 'modules/common/components';

const RegistrationContainer = props => {
  let { companyDetailQuery } = props;

  if (companyDetailQuery.loading) {
    return <Loading />;
  }

  const updatedProps = {
    ...props,
    company: {
      ...companyDetailQuery.companyDetail
    }
  };
  return <RegistrationForms {...updatedProps} />;
};

RegistrationContainer.propTypes = {
  companyDetailQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyDetail), {
    name: 'companyDetailQuery',
    options: ({ match }) => {
      return {
        variables: {
          _id: match.params.id
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(RegistrationContainer);
