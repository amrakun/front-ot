import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { message, Button, Icon } from 'antd';
import { rfqRequestColumns, rfqResponseColumns } from '../../constants';
import Tender from './Tender';

class Rfq extends Tender {
  constructor(props) {
    super(props);

    this.bidSummaryReport = this.bidSummaryReport.bind(this);
    this.award = this.award.bind(this);
  }

  bidSummaryReport() {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier!')
      : this.props.bidSummaryReport(this.state.selectedCompanies);
  }

  award() {
    const { selectedCompanies } = this.state;

    if (selectedCompanies.length > 1) {
      message.error('Please select only one supplier to award!');
    } else if (selectedCompanies.length < 1) {
      message.error('Please select a supplier!');
    } else {
      this.props.award(selectedCompanies[0]);
    }
  }

  render() {
    const { bidSummaryReportLoading } = this.props;
    const data = this.props.data || {};
    const { requestedProducts, isAwarded } = data;

    const tableOperations = [
      <Button
        onClick={this.bidSummaryReport}
        loading={bidSummaryReportLoading}
        key={0}
      >
        Bid summary report
        {!bidSummaryReportLoading ? <Icon type="file-excel" /> : ''}
      </Button>,
      <Button type="primary" onClick={this.award} disabled={isAwarded} key={1}>
        Award
        <Icon type="trophy" />
      </Button>
    ];

    return this.renderTender({
      requestColumns: rfqRequestColumns,
      responseColumns: rfqResponseColumns,
      requestedData: requestedProducts,
      tableOperations: tableOperations
    });
  }
}

Rfq.propTypes = {
  award: PropTypes.func,
  bidSummaryReport: PropTypes.func,
  bidSummaryReportLoading: PropTypes.bool,
  data: PropTypes.object
};

export default withRouter(Rfq);
