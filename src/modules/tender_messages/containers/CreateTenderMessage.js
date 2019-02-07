import React from 'react';
import { compose, gql, graphql } from 'react-apollo';
import { TenderMessageForm } from '../components';
import { mutations, queries } from '../graphql';
import { message } from 'antd';
import PropTypes from 'prop-types';

const CreateTenderMessageContainer = (props, context) => {
  const {
    tenderSuppliersQuery,
    tenderMessageBuyerSend,
    tenderMessageSupplierSend,
    onComplete,
  } = props;
  const { currentUser } = context;

  const mutation = currentUser.isSupplier ? tenderMessageSupplierSend : tenderMessageBuyerSend;

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
    suppliers: tenderSuppliersQuery.loading ? [] : tenderSuppliersQuery.tenderDetail.suppliers,
  };

  return <TenderMessageForm onSubmit={save} {...extendedProps} />;
};

CreateTenderMessageContainer.contextTypes = {
  currentUser: PropTypes.object,
};

export default compose(
  graphql(gql(queries.tenderSuppliers), {
    name: 'tenderSuppliersQuery',
    options: ({ tenderDetail }) => {
      return {
        variables: {
          _id: tenderDetail._id,
        },
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
