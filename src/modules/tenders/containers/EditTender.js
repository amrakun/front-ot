import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { RfqForm, EoiForm } from '../components';
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
    const { history } = props;

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
        history.push(`/${doc.type}?refetch`);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    save,
    data: tenderDetail
  };

  let form = <RfqForm {...updatedProps} />;

  if (tenderDetail.type === 'eoi') form = <EoiForm {...updatedProps} />;

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
