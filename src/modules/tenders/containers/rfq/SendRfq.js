import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import { SendRfq } from '../../components';

const SendRfqContainer = props => {
  let { companyDetailQuery } = props;

  if (companyDetailQuery.loading) {
    return <div />;
  }

  const save = (name, doc) => {
    console.log('', name, doc);
    //const mutation = props[`${name}Edit`];

    // mutation({ variables: { [name]: doc } })
    //   .then(() => {
    //     console.log('Saved');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const updatedProps = {
    ...props,
    save,
    company: {
      ...companyDetailQuery.companyDetail
    }
  };

  return <SendRfq {...updatedProps} />;
};

SendRfqContainer.propTypes = {
  companyDetailQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyDetail), {
    name: 'companyDetailQuery'
  })

  // mutations
  // graphql(gql(mutations.basicInfo), {
  //   name: 'basicInfoEdit'
  // })
)(SendRfqContainer);
