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
  icon: <Icon type="loading" />
};

const notifyReady = {
  message: 'Your report is ready to download',
  icon: <Icon type="file-excel" style={{ color: colors[0] }} />,
  duration: 0
};

class TenderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      },
      bidSummaryReportLoading: false
    };

    this.handleTableChange = this.handleTableChange.bind(this);
    this.award = this.award.bind(this);
    this.bidSummaryReport = this.bidSummaryReport.bind(this);
  }

  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter);
    this.setState({ pagination });
  }

  award(companyId) {
    const { tendersAward, tenderDetailQuery, history } = this.props;

    tendersAward({
      variables: {
        _id: tenderDetailQuery.tenderDetail._id,
        supplierId: companyId
      }
    })
      .then(() => {
        message.success('Awarded!');
        history.push('/rfq');
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  bidSummaryReport(companies) {
    const { tenderDetailQuery } = this.props;

    this.setState({ bidSummaryReportLoading: true });

    notification.open(notifyLoading);

    client
      .query({
        query: gql(queries.rfqBidSummaryReport),
        name: 'rfqBidSummaryReport',

        variables: {
          tenderId: tenderDetailQuery.tenderDetail._id,
          supplierIds: companies
        }
      })
      .then(response => {
        this.setState({ bidSummaryReportLoading: false });

        notification.open({
          ...notifyReady,
          btn: (
            <Button
              type="primary"
              onClick={() =>
                this.downloadReport(
                  response.data.tenderResponsesRfqBidSummaryReport
                )
              }
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

  downloadReport(url) {
    window.open(url);
  }

  sendRegretLetter(companies) {
    console.log(companies);
  }

  render() {
    const { tenderDetailQuery } = this.props;

    if (tenderDetailQuery.loading) {
      return <Loading />;
    }

    const tenderDetail = tenderDetailQuery.tenderDetail;
    const { pagination, bidSummaryReportLoading } = this.state;

    const updatedProps = {
      ...this.props,
      bidSummaryReportLoading,
      award: this.award,
      bidSummaryReport: this.bidSummaryReport,
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
  })
)(TenderContainer);
