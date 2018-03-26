import React from 'react';
import PropTypes from 'prop-types';
import { Rfq, Eoi } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { message, notification, Icon, Button } from 'antd';
import { colors } from 'modules/common/constants';
import { exportFile } from 'modules/common/components';

const notifyIfWantToSend = {
  message: 'Succesfully awarded',
  description: 'Do you want to send regret letters to remaining suppliers now?',
  icon: <Icon type="mail" style={{ color: colors[0] }} />,
  duration: 0,
  key: 'awardedNotification'
};

class TenderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.downloadReport = this.downloadReport.bind(this);
    this.award = this.award.bind(this);
    this.sendRegretLetter = this.sendRegretLetter.bind(this);
  }

  award(companyId) {
    const { tendersAward, tenderDetailQuery } = this.props;

    tendersAward({
      variables: {
        _id: tenderDetailQuery.tenderDetail._id,
        supplierId: companyId
      }
    })
      .then(() => {
        tenderDetailQuery.refetch();
        notification.open({
          ...notifyIfWantToSend,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                this.showRegretLetter();
                notification.close('awardedNotification');
              }}
            >
              Send
            </Button>
          )
        });
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  showRegretLetter() {
    this.setState({ regretLetterModalVisible: true });
  }

  sendRegretLetter(content) {
    const { sendRegretLetter, tenderDetailQuery } = this.props;
    const { tenderDetail } = tenderDetailQuery;

    sendRegretLetter({
      variables: {
        _id: tenderDetail._id,
        subject: `Regret notice for ${tenderDetail.name}`,
        content: content
      }
    })
      .then(() => {
        message.success('Succesfully sent regret letters!');
        tenderDetailQuery.refetch();
        this.setState({ regretLetterModalVisible: false });
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  downloadReport(companies, name) {
    const { tenderDetailQuery } = this.props;
    const loadingReportName = `${name}Loading`;

    let loading = {};

    loading[loadingReportName] = true;
    this.setState(loading);

    exportFile({
      query: queries[name],
      name,
      variables: {
        tenderId: tenderDetailQuery.tenderDetail._id,
        supplierIds: companies
      },
      onFinish: () => {
        loading[loadingReportName] = false;
        this.setState(loading);
      }
    });
  }

  render() {
    const {
      tenderDetailQuery,
      tenderResponsesTableQuery,
      location
    } = this.props;
    const { systemConfig } = this.context;

    const Component = location.pathname.includes('rfq') ? Rfq : Eoi;

    if (tenderDetailQuery.loading || tenderResponsesTableQuery.loading) {
      return <Component loading={true} />;
    }

    const tenderDetail = tenderDetailQuery.tenderDetail || {};
    const tenderResponses = tenderResponsesTableQuery.tenderResponses || {};

    const { rfqBidSummaryReportLoading, regretLetterModalVisible } = this.state;

    const updatedProps = {
      ...this.props,
      rfqBidSummaryReportLoading,
      regretLetterModalVisible,
      tenderDetail,
      emailTemplate: systemConfig.regretLetterTemplate,
      award: this.award,
      downloadReport: this.downloadReport,
      sendRegretLetter: this.sendRegretLetter,
      data: tenderResponses
    };

    return <Component {...updatedProps} />;
  }
}

TenderContainer.propTypes = {
  tenderDetailQuery: PropTypes.object,
  tenderResponsesTableQuery: PropTypes.object,
  tendersAward: PropTypes.func,
  sendRegretLetter: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object
};

TenderContainer.contextTypes = {
  systemConfig: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenderDetail), {
    name: 'tenderDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id }
      };
    }
  }),

  graphql(gql(queries.tenderResponses), {
    name: 'tenderResponsesTableQuery',
    options: ({ match, queryParams }) => {
      return {
        variables: {
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 15,
          tenderId: match.params.id,
          supplierSearch: queryParams.search,
          sort: {
            name: queryParams.sorter,
            productCode: queryParams.productCode
          },
          betweenSearch: {
            name: queryParams.between,
            productCode: queryParams.productCode,
            minValue: queryParams.from,
            maxValue: queryParams.to
          }
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.tendersAward), {
    name: 'tendersAward'
  }),

  graphql(gql(mutations.sendRegretLetter), {
    name: 'sendRegretLetter'
  })
)(TenderContainer);
