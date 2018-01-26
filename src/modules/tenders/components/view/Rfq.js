/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { message, Button, Icon } from 'antd';
import { rfqRequestColumns } from '../../constants';
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
      : this.props.downloadReport(
          this.state.selectedCompanies,
          'rfqBidSummaryReport'
        );
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

  responseColumns() {
    return [
      {
        title: 'Suggested manufacturer if any',
        dataIndex: 'suggestedManufacturer',
        key: '8'
      },
      {
        title: 'Suggested manufacturer part number',
        dataIndex: 'suggestedManufacturerPartNumber',
        key: '9'
      },
      {
        title: 'Unit price (excluding VAT)',
        dataIndex: 'unitPrice',
        key: '10'
      },
      { title: 'Total price', dataIndex: 'totalPrice', key: '11' },
      { title: 'Lead time', dataIndex: 'leadTime', key: '12' },
      { title: 'Shipping terms', dataIndex: 'shippingTerms', key: '13' },
      { title: 'Comment', dataIndex: 'comment', key: '14' },
      {
        title: 'Picture (if required)',
        key: '15',
        render: record => (
          <a onClick={() => window.open(record.file.url)} target="_blank">
            Download
          </a>
        )
      }
    ];
  }

  render() {
    const { rfqBidSummaryReportLoading } = this.props;
    const data = this.props.data || {};
    const { requestedProducts, status } = data;

    const tableOperations = [
      <Button
        onClick={this.bidSummaryReport}
        loading={rfqBidSummaryReportLoading}
        key={0}
      >
        Bid summary list
        {!rfqBidSummaryReportLoading ? <Icon type="file-excel" /> : ''}
      </Button>,
      <Button
        type="primary"
        onClick={this.award}
        disabled={status !== 'closed'}
        key={1}
      >
        Award
        <Icon type="trophy" />
      </Button>
    ];

    return this.renderTender({
      requestColumns: rfqRequestColumns,
      responseColumns: this.responseColumns(),
      requestedData: requestedProducts,
      tableOperations: tableOperations
    });
  }
}

Rfq.propTypes = {
  award: PropTypes.func,
  downloadReport: PropTypes.func,
  bidSummaryReportLoading: PropTypes.bool,
  data: PropTypes.object
};

export default withRouter(Rfq);
