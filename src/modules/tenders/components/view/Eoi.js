import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { message, Button, Icon } from 'antd';
import { eoiResponseColumns } from '../../constants';
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

    return this.renderTender({
      responseColumns: eoiResponseColumns,
      tableOperations: tableOperations
    });
  }
}

Eoi.propTypes = {
  data: PropTypes.object
};

export default withRouter(Eoi);
