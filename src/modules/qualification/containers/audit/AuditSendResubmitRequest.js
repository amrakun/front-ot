import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { mutations } from '../../graphql';
import { message } from 'antd';
import { AuditSendResubmitRequest } from '../../components';

const SendRequestContainer = (props, { __ }) => {
  const { sendRequest, history } = props;

  const save = doc => {
    sendRequest({ variables: doc })
      .then(() => {
        message.success(__('Succesfully sent'));
        history.push('/');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    __,
    save,
  };

  return <AuditSendResubmitRequest {...updatedProps} />;
};

SendRequestContainer.contextTypes = {
  __: PropTypes.func,
};

export default compose(
  // mutations
  graphql(gql(mutations.auditsSupplierSendResubmitRequest), {
    name: 'sendRequest',
  })
)(SendRequestContainer);
