import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { SubmitTender } from '../components';
import { queries, mutations } from '../graphql';

const PublishContainer = ({ tenderDetailQuery, tendersResponsesAdd }) => {
  if (tenderDetailQuery.loading) {
    return null;
  }
  console.log(tenderDetailQuery);

  const save = doc => {
    tendersResponsesAdd({
      variables: { ...doc, _id: tenderDetailQuery.tenderDetail._id }
    })
      .then(() => {
        console.log('Saved');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updatedProps = {
    save,
    data: tenderDetailQuery.tenderDetail || {}
  };

  return <SubmitTender {...updatedProps} />;
};

PublishContainer.propTypes = {
  location: PropTypes.object,
  tenderDetailQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func
};

export default compose(
  graphql(gql(queries.tenderDetail), {
    name: 'tenderDetailQuery',
    options: ({ match }) => {
      console.log(match.params.id);
      return {
        variables: { _id: match.params.id }
      };
    }
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  })
)(PublishContainer);
