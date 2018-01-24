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
  const { auditResponseDetailQuery, supplierBasicInfoQuery, location } = props;

  if (auditResponseDetailQuery.loading || supplierBasicInfoQuery.loading) {
    return <Loading />;
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
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const exportFile = (name, variables) => {
    notification.open(notifyLoading);

    client
      .query({
        query: gql(queries[name]),
        name: name,
        variables: {
          auditId: location.state.auditId,
          supplierId: location.state.supplierId,
          auditResult: true,
          ...variables
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
    company: {
      ...auditResponseDetailQuery
    },
    response: auditResponseDetailQuery.auditResponseDetail,
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

  // mutations
  graphql(gql(mutations.auditsBuyerSaveCoreHseqInfo), {
    name: 'coreHseqInfoEdit'
  }),
  // mutations
  graphql(gql(mutations.auditsBuyerSaveHrInfo), {
    name: 'hrInfoEdit'
  }),
  // mutations
  graphql(gql(mutations.auditsBuyerSaveBusinessInfo), {
    name: 'businessInfoEdit'
  })
)(QualifyAuditContainer);
