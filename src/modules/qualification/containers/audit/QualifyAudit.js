import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { QualifyAudit } from '../../components';
import { message } from 'antd';
import SendResult from './SendResult';

class QualifyAuditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showResult: false,
      isQualifiedAfterLastTab: false,
    };
  }

  renderResult() {
    const { supplierInfoQuery, location, history, auditResponseDetailQuery } = this.props;
    const { showResult, isQualifiedAfterLastTab } = this.state;

    if (!showResult) {
      return null;
    }

    const { companyDetail } = supplierInfoQuery;
    const { auditResponseDetail } = auditResponseDetailQuery;

    return (
      <SendResult
        location={location}
        history={history}
        isQualified={isQualifiedAfterLastTab}
        supplierInfo={companyDetail}
        responseId={auditResponseDetail._id}
      />
    );
  }

  render() {
    const { auditResponseDetailQuery, supplierInfoQuery, location } = this.props;

    if (auditResponseDetailQuery.error || supplierInfoQuery.error) {
      return null;
    }

    if (supplierInfoQuery.loading || auditResponseDetailQuery.loading) {
      return null;
    }

    const save = (name, doc) => {
      const mutation = this.props[`${name}Edit`];

      mutation({
        variables: {
          auditId: location.state.auditId,
          supplierId: location.state.supplierId,
          [name]: doc,
        },
      })
        .then(({ data }) => {
          message.success('Saved');

          auditResponseDetailQuery.refetch();

          if (name === 'businessInfo') {
            this.setState({
              showResult: true,
              isQualifiedAfterLastTab: data.auditsBuyerSaveBusinessInfo.isQualified,
            });
          }
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const updatedProps = {
      ...this.props,
      save,
      response: auditResponseDetailQuery.auditResponseDetail,
      supplierInfo: supplierInfoQuery.companyDetail,
    };

    return (
      <>
        {this.renderResult()}
        <QualifyAudit {...updatedProps} />
      </>
    );
  }
}

QualifyAuditContainer.propTypes = {
  auditResponseDetailQuery: PropTypes.object,
  evidenceInfoEdit: PropTypes.func,
  supplierInfoQuery: PropTypes.object,
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

  graphql(gql(queries.supplierInfo), {
    name: 'supplierInfoQuery',
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
