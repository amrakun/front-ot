import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { SubmitRfq, SubmitEoi } from '../components';
import { queries, mutations } from '../graphql';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const PublishContainer = ({
  tenderDetailQuery,
  tendersResponsesAdd,
  history
}) => {
  if (tenderDetailQuery.loading) {
    return <Loading />;
  }

  const save = doc => {
    tendersResponsesAdd({
      variables: { ...doc }
    })
      .then(() => {
        message.success('Successfully submitted a tender!');
        history.push('/rfq-and-eoi?refetch', {
          newTenderId: doc.tenderId
        });
      })
      .catch(error => {
        console.log(error);
        message.error(error.message);
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
  tendersResponsesAdd: PropTypes.func,
  history: PropTypes.object
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
