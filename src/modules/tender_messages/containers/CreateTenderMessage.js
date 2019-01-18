import React from 'react';
import { compose, gql, graphql } from 'react-apollo';
import { TenderMessageForm } from '../components';
import { mutations } from '../graphql';
import { message } from 'antd';
import PropTypes from 'prop-types';

const CreateTenderMessageContainer = (props, context) => {
  const { tenderMessageBuyerSend, tenderMessageSupplierSend } = props;
  const { currentUser } = context;

  const mutation = currentUser.isSupplier
    ? tenderMessageSupplierSend
    : tenderMessageBuyerSend;

  const save = doc => {
    mutation({ variables: { ...doc } })
      .then(() => {
        message.success('Message sent');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  return <TenderMessageForm onSubmit={save} {...props} />;
};

CreateTenderMessageContainer.contextTypes = {
  currentUser: PropTypes.object
};

export default compose(
  graphql(gql(mutations.tenderMessageBuyerSend), {
    name: 'tenderMessageBuyerSend',
    options: () => {
      return {
        refetchQueries: ['tenderMessages']
      };
    }
  }),

  graphql(gql(mutations.tenderMessageSupplierSend), {
    name: 'tenderMessageSupplierSend',
    options: () => {
      return {
        refetchQueries: ['tenderMessages']
      };
    }
  })
)(CreateTenderMessageContainer);
