import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { QualifyAudit } from '../../components';
import { message } from 'antd';

const QualifyAuditContainer = props => {
  const { auditResponseDetailQuery, supplierBasicInfoQuery, location, history } = props;

  if (auditResponseDetailQuery.error || supplierBasicInfoQuery.error) {
    return null;
  }

  if (supplierBasicInfoQuery.loading || auditResponseDetailQuery.loading) {
    return null;
  }

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    mutation({
      variables: {
        auditId: location.state.auditId,
        supplierId: location.state.supplierId,
        [name]: doc,
      },
    })
      .then(() => {
        message.success('Saved');

        auditResponseDetailQuery.refetch();

        if (name === 'businessInfo') {
          history.push('/audit/responses?refetch');
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    response: auditResponseDetailQuery.auditResponseDetail,
    supplierInfo: supplierBasicInfoQuery.companyDetail,
  };

  return <QualifyAudit {...updatedProps} />;
};

QualifyAuditContainer.propTypes = {
  auditResponseDetailQuery: PropTypes.object,
  evidenceInfoEdit: PropTypes.func,
  supplierBasicInfoQuery: PropTypes.object,
  location: PropTypes.object,
};

export default compose(
  graphql(gql(queries.auditResponseDetail), {
    name: 'auditResponseDetailQuery',
    options: ({ location }) => {
      return {
        variables: {
          auditId: (location.state || {}).auditId,
          supplierId: (location.state || {}).supplierId,
        },
      };
    },
  }),

  graphql(gql(queries.supplierBasicInfo), {
    name: 'supplierBasicInfoQuery',
    options: ({ location }) => {
      return {
        variables: {
          _id: (location.state || {}).supplierId,
        },
      };
    },
  }),

  //mutations
  graphql(gql(mutations.auditsBuyerSaveCoreHseqInfo), {
    name: 'coreHseqInfoEdit',
  }),

  graphql(gql(mutations.auditsBuyerSaveHrInfo), {
    name: 'hrInfoEdit',
  }),

  graphql(gql(mutations.auditsBuyerSaveBusinessInfo), {
    name: 'businessInfoEdit',
  })
)(QualifyAuditContainer);
