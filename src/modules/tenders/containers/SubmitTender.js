import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { SubmitRfq, SubmitEoi } from '../components';
import { queries, mutations } from '../graphql';

const PublishContainer = ({ tenderDetailQuery, tendersResponsesAdd }) => {
  if (tenderDetailQuery.loading) {
    return null;
  }

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

  let form = <SubmitRfq {...updatedProps} />;

  if (tenderDetailQuery.tenderDetail.type === 'eoi')
    form = <SubmitEoi {...updatedProps} />;

  return form;
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
      return {
        variables: { _id: match.params.id }
      };
    }
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  })
)(PublishContainer);
