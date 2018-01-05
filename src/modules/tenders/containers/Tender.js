import React from 'react';
import PropTypes from 'prop-types';
import { Tender } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { message, notification, Icon } from 'antd';
import { colors } from 'modules/common/colors';

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
    const { tenderResponsesBidSummaryReport, tenderDetailQuery } = this.props;

    this.setState({ bidSummaryReportLoading: true });
    notification.open({
      message: 'Building an excel...',
      description: 'You will get notified when your report is ready!',
      icon: <Icon type="loading" />
    });

    tenderResponsesBidSummaryReport({
      variables: {
        tenderId: tenderDetailQuery.tenderDetail._id,
        supplierIds: companies
      }
    })
      .then(response => {
        this.setState({ bidSummaryReportLoading: false });

        notification.open({
          message: 'Your report is ready to download',
          description: (
            <a
              href={'/' + response.data.tenderResponsesBidSummaryReport}
              rel="external"
              target="blank"
            >
              <Icon type="download" /> Download
            </a>
          ),
          icon: <Icon type="file-excel" style={{ color: colors[0] }} />,
          duration: 0
        });
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  sendRegretLetter(companies) {
    console.log(companies);
  }

  render() {
    const { tenderDetailQuery } = this.props;

    if (tenderDetailQuery.loading) {
      return <Tender loading={true} />;
    }

    const { pagination, bidSummaryReportLoading } = this.state;

    const updatedProps = {
      ...this.props,
      bidSummaryReportLoading,
      award: this.award,
      bidSummaryReport: this.bidSummaryReport,
      sendRegretLetter: this.sendRegretLetter,
      data: tenderDetailQuery.tenderDetail,
      loading: false,
      pagination: {
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <Tender {...updatedProps} />;
  }
}

TenderContainer.propTypes = {
  tenderDetailQuery: PropTypes.object,
  tendersAward: PropTypes.func,
  tenderResponsesBidSummaryReport: PropTypes.func,
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

  graphql(gql(mutations.tenderResponsesBidSummaryReport), {
    name: 'tenderResponsesBidSummaryReport'
  })
)(TenderContainer);
