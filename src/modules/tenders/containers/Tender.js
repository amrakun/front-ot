import React from 'react';
import PropTypes from 'prop-types';
import { Rfq, Eoi } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { message, notification, Icon, Button } from 'antd';
import { Loading } from 'modules/common/components';
import { colors } from 'modules/common/constants';
import { withTableProps } from 'modules/common/containers';
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
    const { tendersAward, tenderDetailTableQuery } = this.props;

    tendersAward({
      variables: {
        _id: tenderDetailTableQuery.tenderDetail._id,
        supplierId: companyId
      }
    })
      .then(() => {
        tenderDetailTableQuery.refetch();
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
    const { sendRegretLetter, tenderDetailTableQuery } = this.props;
    const { tenderDetail } = tenderDetailTableQuery;

    sendRegretLetter({
      variables: {
        _id: tenderDetail._id,
        subject: `Regret notice for ${tenderDetail.name}`,
        content: content
      }
    })
      .then(() => {
        message.success('Succesfully sent regret letters!');
        tenderDetailTableQuery.refetch();
        this.setState({ regretLetterModalVisible: false });
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  downloadReport(companies, name) {
    const { tenderDetailTableQuery } = this.props;
    const loadingReportName = `${name}Loading`;

    let loading = {};

    loading[loadingReportName] = true;
    this.setState(loading);

    exportFile({
      query: queries[name],
      name,
      variables: {
        tenderId: tenderDetailTableQuery.tenderDetail._id,
        supplierIds: companies
      },
      onFinish: () => {
        loading[loadingReportName] = false;
        this.setState(loading);
      }
    });
  }

  render() {
    const { tenderDetailTableQuery } = this.props;
    const { systemConfig } = this.context;

    if (tenderDetailTableQuery.loading) {
      return <Loading />;
    }

    const tenderDetail = tenderDetailTableQuery.tenderDetail || {};

    const { rfqBidSummaryReportLoading, regretLetterModalVisible } = this.state;

    const updatedProps = {
      ...this.props,
      rfqBidSummaryReportLoading,
      regretLetterModalVisible,
      emailTemplate: systemConfig.regretLetterTemplate,
      award: this.award,
      downloadReport: this.downloadReport,
      sendRegretLetter: this.sendRegretLetter,
      data: tenderDetail
    };

    if (tenderDetail.type === 'rfq') return <Rfq {...updatedProps} />;
    else return <Eoi {...updatedProps} />;
  }
}

TenderContainer.propTypes = {
  tenderDetailTableQuery: PropTypes.object,
  tendersAward: PropTypes.func,
  sendRegretLetter: PropTypes.func,
  history: PropTypes.object
};

TenderContainer.contextTypes = {
  systemConfig: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenderDetail), {
    name: 'tenderDetailTableQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id }
      };
    }
  }),

  graphql(gql(mutations.tendersAward), {
    name: 'tendersAward'
  }),

  graphql(gql(mutations.sendRegretLetter), {
    name: 'sendRegretLetter'
  })
)(withTableProps(TenderContainer));
