import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { SubmitAudit } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const SubmitAuditContainer = (props, context) => {
  let {
    auditResponseByUserQuery,
    companyByUserQuery,
    evidenceInfoEdit,
    sendResponse
  } = props;
  const { currentUser } = context;

  if (auditResponseByUserQuery.loading || companyByUserQuery.loading) {
    return <Loading />;
  }

  const { match } = props;

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    mutation({
      variables: {
        auditId: match.params.id,
        supplierId: currentUser.companyId,
        [name]: doc
      }
    })
      .then(() => {
        message.success('Saved');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const saveEvidenceChecks = doc => {
    evidenceInfoEdit({ variables: { evidenceInfo: doc } })
      .then(() => {
        message.success('Saved');
        send();
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const send = () => {
    const { history } = props;

    sendResponse({
      variables: {
        auditId: match.params.id,
        supplierId: currentUser.companyId
      }
    })
      .then(() => {
        message.success('Successfully sent your response!');
        history.push('/qualification?refetch');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    saveEvidenceChecks,
    company: {
      ...auditResponseByUserQuery.auditResponseByUser
    },
    supplierInfo: companyByUserQuery.companyByUser
  };
  return <SubmitAudit {...updatedProps} />;
};

SubmitAuditContainer.propTypes = {
  auditResponseByUserQuery: PropTypes.object,
  evidenceInfoEdit: PropTypes.func,
  companyByUserQuery: PropTypes.object,
  sendResponse: PropTypes.func,
  match: PropTypes.object
};

SubmitAuditContainer.contextTypes = {
  currentUser: PropTypes.object
};

export default compose(
  graphql(gql(queries.auditResponseByUser), {
    name: 'auditResponseByUserQuery',
    options: ({ match }) => {
      return {
        variables: { auditId: match.params.id }
      };
    }
  }),

  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery'
  }),

  // mutations
  graphql(gql(mutations.auditsSupplierSaveBasicInfo), {
    name: 'basicInfoEdit'
  }),
  graphql(gql(mutations.auditsSupplierSaveCoreHseqInfo), {
    name: 'coreHseqInfoEdit'
  }),
  graphql(gql(mutations.auditsSupplierSaveHrInfo), {
    name: 'hrInfoEdit'
  }),
  graphql(gql(mutations.auditsSupplierSaveBusinessInfo), {
    name: 'businessInfoEdit'
  }),
  graphql(gql(mutations.auditsSupplierSaveEvidenceInfo), {
    name: 'evidenceInfoEdit'
  }),
  graphql(gql(mutations.auditsSupplierSendResponse), {
    name: 'sendResponse'
  })
)(SubmitAuditContainer);
