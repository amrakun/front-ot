import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { QualifyAudit } from '../../components';
import { Loading, exportFile } from 'modules/common/components';
import { message } from 'antd';

const QualifyAuditContainer = props => {
  const { auditResponseDetailQuery, supplierBasicInfoQuery, location } = props;

  if (supplierBasicInfoQuery.loading) {
    return <Loading />;
  }

  let auditResponseDetail = {};

  if (!supplierBasicInfoQuery.loading) {
    auditResponseDetail = auditResponseDetailQuery.auditResponseDetail;
  }

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    mutation({
      variables: {
        auditId: location.state.auditId,
        supplierId: location.state.supplierId,
        [name]: doc
      }
    })
      .then(() => {
        message.success('Saved');
        auditResponseDetailQuery.refetch();
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const exportFiles = (name, variables) => {
    exportFile({
      query: queries[name],
      name,
      variables: {
        ...variables,
        supplierId: location.state.supplierId,
        auditId: location.state.auditId,
        auditResult: auditResponseDetail.isQualified
      }
    });
  };

  const updatedProps = {
    ...props,
    save,
    exportFiles,
    response: auditResponseDetail,
    supplierInfo: supplierBasicInfoQuery.companyDetail
  };
  return <QualifyAudit {...updatedProps} />;
};

QualifyAuditContainer.propTypes = {
  auditResponseDetailQuery: PropTypes.object,
  evidenceInfoEdit: PropTypes.func,
  supplierBasicInfoQuery: PropTypes.object,
  location: PropTypes.object
};

export default compose(
  graphql(gql(queries.auditResponseDetail), {
    name: 'auditResponseDetailQuery',
    options: ({ location }) => {
      return {
        variables: {
          auditId: location.state.auditId,
          supplierId: location.state.supplierId
        }
      };
    }
  }),

  graphql(gql(queries.supplierBasicInfo), {
    name: 'supplierBasicInfoQuery',
    options: ({ location }) => {
      return {
        variables: {
          _id: location.state.supplierId
        }
      };
    }
  }),

  graphql(gql(queries.companyByUser), {
    name: 'companyByUserQuery'
  }),

  //mutations
  graphql(gql(mutations.auditsBuyerSaveCoreHseqInfo), {
    name: 'coreHseqInfoEdit'
  }),

  graphql(gql(mutations.auditsBuyerSaveHrInfo), {
    name: 'hrInfoEdit'
  }),

  graphql(gql(mutations.auditsBuyerSaveBusinessInfo), {
    name: 'businessInfoEdit'
  })
)(QualifyAuditContainer);
