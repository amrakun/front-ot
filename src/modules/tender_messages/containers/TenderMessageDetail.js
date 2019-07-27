import React from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { TenderMessageDetail } from '../components';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

const TenderMessageDetailContainer = (props) => {
  const { currentUser, tenderMessageDetailQuery, tenderMessageBuyerSend } = props;

  if (tenderMessageDetailQuery.loading) return <Icon type="loading" />;

  const reply = (doc, callback) => {
    tenderMessageBuyerSend({ variables: doc })
      .then(() => callback())
      .catch((e) => console.log(e.message));
  }

  return (
    <TenderMessageDetail
      currentUser={currentUser}
      reply={reply}
      tenderMessageDetail={tenderMessageDetailQuery.tenderMessageDetail}
    />
  );
};

TenderMessageDetailContainer.propTypes = {
  tenderMessageDetailQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenderMessageDetail), {
    name: 'tenderMessageDetailQuery',
    options: ({ _id }) => {
      return {
        variables: { _id }
      };
    }
  }),
  graphql(gql(mutations.tenderMessageBuyerSend), {
    name: 'tenderMessageBuyerSend',
    options: () => {
      return {
        refetchQueries: ['tenderMessages'],
      };
    },
  }),
)(TenderMessageDetailContainer);
