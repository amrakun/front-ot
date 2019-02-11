import React from 'react';
import { compose, gql, graphql } from 'react-apollo';
import { TenderMessageForm } from '../components';
import { mutations, queries } from '../graphql';
import { message } from 'antd';

const CreateTenderMessageContainer = (props, context) => {
  const {
    tenderSuppliersQuery,
    tenderMessageBuyerSend,
    tenderMessageSupplierSend,
    onComplete,
    currentUser,
  } = props;

  let mutation = tenderMessageSupplierSend;
  let suppliers = [];

  if (!currentUser.isSupplier) {
    mutation = tenderMessageBuyerSend;
    suppliers = tenderSuppliersQuery.loading ? [] : tenderSuppliersQuery.tenderDetail.suppliers;
  }

  const save = doc => {
    mutation({ variables: { ...doc } })
      .then(() => {
        message.success('Message sent');
        if (onComplete) onComplete();
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const extendedProps = {
    ...props,
    suppliers,
  };

  return <TenderMessageForm onSubmit={save} {...extendedProps} />;
};

export default compose(
  graphql(gql(queries.tenderSuppliers), {
    name: 'tenderSuppliersQuery',
    options: ({ tenderDetail, currentUser }) => {
      return {
        variables: {
          _id: tenderDetail._id,
        },
        skip: currentUser.isSupplier,
      };
    },
  }),

  graphql(gql(mutations.tenderMessageBuyerSend), {
    name: 'tenderMessageBuyerSend',
    options: () => {
      return {
        refetchQueries: ['tenderMessages'],
      };
    },
  }),

  graphql(gql(mutations.tenderMessageSupplierSend), {
    name: 'tenderMessageSupplierSend',
    options: () => {
      return {
        refetchQueries: ['tenderMessages'],
      };
    },
  })
)(CreateTenderMessageContainer);
