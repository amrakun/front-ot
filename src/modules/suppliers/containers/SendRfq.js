import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { SendRfq } from '../components';

const SendRfqContainer = props => {
  let { companyDetailQuery } = props;

  if (companyDetailQuery.loading) {
    return <div />;
  }

  const updatedProps = {
    ...props,
    company: {
      ...companyDetailQuery.companyDetail,
      refetch: companyDetailQuery.refetch
    }
  };

  return <SendRfq {...updatedProps} />;
};

SendRfqContainer.propTypes = {
  companyDetailQuery: PropTypes.object
};

export default graphql(gql(queries.companyDetail), {
  name: 'companyDetailQuery'
})(SendRfqContainer);
