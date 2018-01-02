import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { CreateRfq, CreateEoi } from '../components';
import { queries, mutations } from '../graphql';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const PublishContainer = props => {
  const { tenderDetailQuery, tendersEdit } = props;

  if (tenderDetailQuery.loading) {
    return <Loading />;
  }

  const tenderDetail = tenderDetailQuery.tenderDetail || {};

  const save = doc => {
    const [publishDate, closeDate] = doc.dateRange;

    tendersEdit({
      variables: {
        ...doc,
        _id: tenderDetail._id,
        publishDate,
        closeDate
      }
    })
      .then(() => {
        message.success('Saved');
      })
      .catch(error => {
        message.error('Error occured: EditTender', error);
      });
  };

  const updatedProps = {
    save,
    data: tenderDetail
  };

  let form = <CreateRfq {...updatedProps} />;

  if (tenderDetail.type === 'eoi') form = <CreateEoi {...updatedProps} />;

  return form;
};

PublishContainer.propTypes = {
  tenderDetailQuery: PropTypes.object,
  tendersEdit: PropTypes.func
};

export default compose(
  graphql(gql(queries.tenderUpdateDetail), {
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
