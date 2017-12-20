import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { Publish } from '../components';
import { queries, mutations } from '../graphql';

const PublishContainer = ({ tenderDetailQuery, tendersAdd, location }) => {
  if (tenderDetailQuery.loading) {
    return null;
  }

  const save = doc => {
    const [publishDate, closeDate] = doc.dateRange;

    tendersAdd({ variables: { ...doc, publishDate, closeDate } })
      .then(() => {
        console.log('Saved');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updatedProps = {
    save,
    location,
    data: tenderDetailQuery.tenderDetail
  };

  return <Publish {...updatedProps} />;
};

PublishContainer.propTypes = {
  location: PropTypes.object,
  tenderDetailQuery: PropTypes.object,
  tendersAdd: PropTypes.func
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

  graphql(gql(mutations.tendersAdd), {
    name: 'tendersAdd'
  })
)(PublishContainer);
