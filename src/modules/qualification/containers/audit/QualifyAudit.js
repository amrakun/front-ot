import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { QualifyAudit } from '../../components';
import { Loading } from 'modules/common/components';
import client from 'apolloClient';
import { notifyReady, notifyLoading } from 'modules/common/constants';
import { message, notification, Button, Icon } from 'antd';

const QualifyAuditContainer = props => {
  const {
    auditResponseDetailQuery,
    supplierBasicInfoQuery,
    auditsBuyerSendFiles,
    location
  } = props;

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

  const exportFile = (name, variables) => {
    notification.open(notifyLoading);

    const common = {
      supplierId: location.state.supplierId,
      auditId: location.state.auditId
    };

    auditsBuyerSendFiles({
      variables: {
        ...common,
        improvementPlan: name === 'auditReport',
        report: name === 'auditImprovementPlan'
      }
    })
      .then(() => {
        message.success('Successfuly sent!');
      })
      .catch(error => {
        message.error(error.message);
      });

    client
      .query({
        query: gql(queries[name]),
        name: name,
        variables: {
          ...common,
          ...variables,
          auditResult: auditResponseDetail.isQualified
        }
      })
      .then(response => {
        notification.close('loadingNotification');

        notification.open({
          ...notifyReady,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.close('downloadNotification');
                window.open(response.data[Object.keys(response.data)[0]]);
              }}
            >
              <Icon type="download" /> Download
            </Button>
          )
        });
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    exportFile,
    response: auditResponseDetail,
    supplierInfo: supplierBasicInfoQuery.companyDetail
  };
  return <QualifyAudit {...updatedProps} />;
};

QualifyAuditContainer.propTypes = {
  auditResponseDetailQuery: PropTypes.object,
  evidenceInfoEdit: PropTypes.func,
  supplierBasicInfoQuery: PropTypes.object,
  location: PropTypes.object,
  auditsBuyerSendFiles: PropTypes.func
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
  }),

  graphql(gql(mutations.auditsBuyerSendFiles), {
    name: 'auditsBuyerSendFiles'
  })
)(QualifyAuditContainer);
