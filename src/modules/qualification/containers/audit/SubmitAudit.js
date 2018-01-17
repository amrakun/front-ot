import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { AuditForms } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const AuditFormsContainer = props => {
  let { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    mutation({ variables: { [name]: doc } })
      .then(() => {
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
      ...companyByUserQuery.companyByUser
    },
    supplierInfo: companyByUserQuery.companyByUser
  };
  return <AuditForms {...updatedProps} />;
};

AuditFormsContainer.propTypes = {
  companyByUserQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery'
  }),

  // mutations
  graphql(gql(mutations.auditsSupplierSaveBasicInfo), {
    name: 'basicInfoEdit'
  }),
  // mutations
  graphql(gql(mutations.auditsSupplierSaveCoreHseqInfo), {
    name: 'coreHseqInfoEdit'
  }),
  // mutations
  graphql(gql(mutations.auditsSupplierSaveHrInfo), {
    name: 'hrEdit'
  }),
  // mutations
  graphql(gql(mutations.auditsSupplierSaveBusinessInfo), {
    name: 'businessInfoEdit'
  }),
  // mutations
  graphql(gql(mutations.auditsSupplierSaveEvidenceInfo), {
    name: 'evidenceInfoEdit'
  })
)(AuditFormsContainer);
