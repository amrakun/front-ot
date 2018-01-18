import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { AuditForms } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const AuditFormsContainer = props => {
  let { companyByUserQuery, evidenceInfoEdit } = props;

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

  const saveEvidenceChecks = doc => {
    const { history } = this.props;

    evidenceInfoEdit({ variables: { evidenceInfo: doc } })
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
      ...companyByUserQuery.companyByUser
    },
    supplierInfo: companyByUserQuery.companyByUser
  };
  return <AuditForms {...updatedProps} />;
};

AuditFormsContainer.propTypes = {
  companyByUserQuery: PropTypes.object,
  evidenceInfoEdit: PropTypes.func
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
    name: 'hrInfoEdit'
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
