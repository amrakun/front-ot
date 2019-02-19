import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { RfqForm, EoiForm } from '../components';
import { queries, mutations } from '../graphql';
import { Loading } from 'modules/common/components';
import { alert } from 'modules/common/utils';

const EditContainer = props => {
  const { tenderDetailQuery, buyersQuery, tendersEdit } = props;

  if (tenderDetailQuery.error) {
    return null;
  }

  if (tenderDetailQuery.loading) {
    return <Loading />;
  }

  const tenderDetail = tenderDetailQuery.tenderDetail || {};
  const { type } = tenderDetail;

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
        alert.success('Saved');
        history.push(`/${type}?refetch`);
      })
      .catch(error => {
        alert.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    type,
    save,
    data: tenderDetail,
    buyers: buyersQuery.users || []
  };

  if (type === 'eoi') {
    return <EoiForm {...updatedProps} />;
  }

  return <RfqForm {...updatedProps} />;
};

EditContainer.propTypes = {
  tenderDetailQuery: PropTypes.object,
  buyersQuery: PropTypes.object,
  tendersEdit: PropTypes.func
};

export default compose(
  graphql(gql(queries.tenderUpdateDetail), {
    name: 'tenderDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id },
        fetchPolicy: 'network-only'
      };
    }
  }),

  graphql(gql(queries.buyers), {
    name: 'buyersQuery',
  }),

  graphql(gql(mutations.tendersEdit), {
    name: 'tendersEdit'
  })
)(EditContainer);
