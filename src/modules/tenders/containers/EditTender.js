import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { CreateRfq, CreateEoi } from '../components';
import { queries, mutations } from '../graphql';
import { message } from 'antd';

const PublishContainer = ({ tenderDetailQuery, tendersEdit }) => {
  if (tenderDetailQuery.loading) {
    return null;
  }

  const save = doc => {
    const [publishDate, closeDate] = doc.dateRange;

    tendersEdit({
      variables: {
        ...doc,
        _id: tenderDetailQuery.tenderDetail._id,
        publishDate,
        closeDate
      }
    })
      .then(() => {
        message.success('Saved');
      })
      .catch(error => {
        message.error('Error occured: EditTender');
        console.log(error);
      });
  };

  const updatedProps = {
    save,
    data: tenderDetailQuery.tenderDetail || {}
  };

  let form = <CreateRfq {...updatedProps} />;

  if (tenderDetailQuery.tenderDetail.type === 'eoi')
    form = <CreateEoi {...updatedProps} />;

  return form;
};

PublishContainer.propTypes = {
  tenderDetailQuery: PropTypes.object,
  tendersEdit: PropTypes.func
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

  graphql(gql(mutations.tendersEdit), {
    name: 'tendersEdit'
  })
)(PublishContainer);
