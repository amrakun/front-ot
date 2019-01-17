import React from 'react';
import { compose, gql, graphql } from 'react-apollo';
import { TenderMessageForm } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';

const CreateTenderMessageContainer = props => {
  const { tenderMessageBuyerSend } = props;

  const save = doc => {
    console.log(doc);
    tenderMessageBuyerSend({ variables: { ...doc } })
      .then(tenderMessage => {
        message.success('Message sent');
        console.log(tenderMessage);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  return <TenderMessageForm onSubmit={save} {...props} />;
};

export default compose(
  graphql(gql(mutations.tenderMessageBuyerSend), {
    name: 'tenderMessageBuyerSend',
    options: () => {
      return {
        refetchQueries: ['tenderMessages']
      };
    }
  })
)(CreateTenderMessageContainer);
