import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import EvidenceCheck from 'modules/qualification/components/audit/EvidenceCheck';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const EvidenceCheckContainer = (props, context) => {
  const { auditResponseByUserQuery, sendResponse } = props;
  const { currentUser } = context;

  if (auditResponseByUserQuery.error) {
    return null;
  }

  if (auditResponseByUserQuery.loading) {
    return <Loading />;
  }

  const { match } = props;
  const auditResponse = auditResponseByUserQuery.auditResponseByUser;

  const send = () => {
    const { history } = props;
    const { __ } = context;

    const { basicInfo, coreHseqInfo, hrInfo, businessInfo } = auditResponse || {};

    if (!basicInfo || !coreHseqInfo || !hrInfo || !businessInfo) {
      return message.error(__('Please fill all tab information!'));
    }

    sendResponse({
      variables: {
        auditId: match.params.id,
        supplierId: currentUser.companyId,
      },
    })
      .then(() => {
        message.success(__('Successfully sent your response!'));
        history.push('/qualification?refetch');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    send,
    auditResponse,
  };

  return <EvidenceCheck {...updatedProps} />;
};

EvidenceCheckContainer.contextTypes = {
  currentUser: PropTypes.object,
  __: PropTypes.func,
};

export default compose(
  graphql(gql(queries.auditResponseByUser), {
    name: 'auditResponseByUserQuery',
    options: ({ match }) => {
      return {
        variables: { auditId: match.params.id },
      };
    },
  }),
  graphql(gql(mutations.auditsSupplierSendResponse), {
    name: 'sendResponse',
  })
)(EvidenceCheckContainer);
