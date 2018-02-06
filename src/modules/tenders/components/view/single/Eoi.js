/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { message, Button, Icon } from 'antd';
import Tender from './Tender';

class Eoi extends Tender {
  constructor(props) {
    super(props);

    this.handleEoiShortList = this.handleEoiShortList.bind(this);
    this.handleEoiBidderList = this.handleEoiBidderList.bind(this);
  }

  handleEoiShortList() {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier!')
      : this.props.downloadReport(this.state.selectedCompanies, 'eoiShortList');
  }

  handleEoiBidderList() {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier!')
      : this.props.downloadReport(
          this.state.selectedCompanies,
          'eoiBidderList'
        );
  }

  responseColumns() {
    return [
      { title: 'Document file name', dataIndex: 'name', key: '3' },
      {
        title: 'Submitted',
        key: '2',
        render: record => (record.isSubmitted ? 'Yes' : 'No')
      },
      {
        title: 'Picture',
        key: '5',
        render: record => (
          <a onClick={() => window.open(record.file.url)} target="_blank">
            Download
          </a>
        )
      },
      { title: 'Notes', dataIndex: 'notes', key: '4' }
    ];
  }

  render() {
    const tableOperations = [
      <Button onClick={this.handleEoiBidderList} key={0}>
        EOI bidder list
        <Icon type="file-excel" />
      </Button>,
      <Button onClick={this.handleEoiShortList} key={1}>
        EOI short list
        <Icon type="file-excel" />
      </Button>
    ];

    return (
      <div>
        {this.renderStats()}
        {this.renderTable({
          responseColumns: this.responseColumns(),
          tableOperations: tableOperations
        })}
      </div>
    );
  }
}

Eoi.propTypes = {
  data: PropTypes.array
};

export default withRouter(Eoi);
