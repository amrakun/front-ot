import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { SubmitAudit } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const SubmitAuditContainer = (props, context) => {
  const { auditResponseByUserQuery, companyByUserQuery } = props;

  const { currentUser } = context;

  if (auditResponseByUserQuery.error || companyByUserQuery.error) {
    return null;
  }

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
        [name]: doc,
      },
    })
      .then(() => {
        auditResponseByUserQuery.refetch();
        message.success('Saved');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    company: {
      ...auditResponseByUserQuery.auditResponseByUser,
    },
    supplierInfo: companyByUserQuery.companyByUser,
  };
  return <SubmitAudit {...updatedProps} />;
};

SubmitAuditContainer.propTypes = {
  auditResponseByUserQuery: PropTypes.object,
  companyByUserQuery: PropTypes.object,
  match: PropTypes.object,
};

SubmitAuditContainer.contextTypes = {
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

  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery',
  }),

  // mutations
  graphql(gql(mutations.auditsSupplierSaveBasicInfo), {
    name: 'basicInfoEdit',
  }),
  graphql(gql(mutations.auditsSupplierSaveCoreHseqInfo), {
    name: 'coreHseqInfoEdit',
  }),
  graphql(gql(mutations.auditsSupplierSaveHrInfo), {
    name: 'hrInfoEdit',
  }),
  graphql(gql(mutations.auditsSupplierSaveBusinessInfo), {
    name: 'businessInfoEdit',
  })
)(SubmitAuditContainer);
