import React from 'react';
import PropTypes from 'prop-types';
import { Rfq, Eoi } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { message, notification, Icon, Button } from 'antd';
import { colors } from 'modules/common/colors';
import client from 'apolloClient';
import { Loading } from 'modules/common/components';

const notifyLoading = {
  message: 'Building an excel...',
  description: 'You will get notified when your report is ready!',
  icon: <Icon type="loading" />,
  duration: 5,
  key: 'loadingNotification'
};

const notifyReady = {
  message: 'Your report is ready to download',
  icon: <Icon type="file-excel" style={{ color: colors[0] }} />,
  duration: 0,
  key: 'downloadNotification'
};

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

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this);
    this.downloadReport = this.downloadReport.bind(this);
    this.award = this.award.bind(this);
    this.sendRegretLetter = this.sendRegretLetter.bind(this);
  }

  handleTableChange(pagination) {
    this.setState({ pagination });
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

    notification.open(notifyLoading);

    client
      .query({
        query: gql(queries[name]),
        name: name,

        variables: {
          tenderId: tenderDetailQuery.tenderDetail._id,
          supplierIds: companies
        }
      })
      .then(response => {
        loading[loadingReportName] = false;
        this.setState(loading);

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
  }

  render() {
    const { tenderDetailQuery } = this.props;

    if (tenderDetailQuery.loading) {
      return <Loading />;
    }

    const tenderDetail = tenderDetailQuery.tenderDetail;
    const {
      pagination,
      rfqBidSummaryReportLoading,
      regretLetterModalVisible
    } = this.state;

    const updatedProps = {
      ...this.props,
      rfqBidSummaryReportLoading,
      regretLetterModalVisible,
      award: this.award,
      downloadReport: this.downloadReport,
      sendRegretLetter: this.sendRegretLetter,
      data: tenderDetail,
      loading: false,
      pagination: {
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    if (tenderDetail.type === 'rfq') return <Rfq {...updatedProps} />;
    else return <Eoi {...updatedProps} />;
  }
}

TenderContainer.propTypes = {
  tenderDetailQuery: PropTypes.object,
  tendersAward: PropTypes.func,
  sendRegretLetter: PropTypes.func,
  history: PropTypes.object
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

  graphql(gql(mutations.tendersAward), {
    name: 'tendersAward'
  }),

  graphql(gql(mutations.sendRegretLetter), {
    name: 'sendRegretLetter'
  })
)(TenderContainer);
