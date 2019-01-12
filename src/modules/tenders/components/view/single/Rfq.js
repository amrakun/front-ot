/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Table,
  message,
  Button,
  Icon,
  Select,
  Row,
  Col,
  Card,
  Input
} from 'antd';
import { rfqRequestColumns } from '../../../constants';
import Tender from './Tender';
import { readFileUrl } from 'modules/common/utils';
import router from 'modules/common/router';

const Option = Select.Option;

class Rfq extends Tender {
  constructor(props, context) {
    super(props);

    const { history } = props;

    const sort = router.getParam(history, 'sorter');
    const productCode = router.getParam(history, 'productCode');
    const betweenSearch = router.getParam(history, 'between');
    const from = router.getParam(history, 'from');
    const to = router.getParam(history, 'to');

    this.state = {
      ...this.state,
      regretLetterContent: context.systemConfig.regretLetterTemplate || '',
      productCode: productCode || '',
      filter: sort || betweenSearch,
      from,
      to
    };

    this.bidSummaryReport = this.bidSummaryReport.bind(this);
    this.award = this.award.bind(this);
    this.handleProductCodeChange = this.handleProductCodeChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleBetweenSearch = this.handleBetweenSearch.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  bidSummaryReport() {
    const { selectedCompanies } = this.state;

    if (selectedCompanies.length < 1) {
      return message.error('Please select atleast one supplier!');
    }

    this.props.downloadReport(selectedCompanies, 'rfqBidSummaryReport');
  }

  award() {
    const { selectedCompanies } = this.state;

    this.props.award(selectedCompanies);
  }

  handleProductCodeChange(value) {
    this.setState({ productCode: value });

    router.setParams(this.props.history, { productCode: value });
  }

  handleFilterChange(value) {
    this.setState({ filter: value });

    const { history } = this.props;

    if (value === 'minTotalPrice' || value === 'minUnitPrice') {
      router.removeParams(history, 'between', 'from', 'to');
      router.setParams(history, { sorter: value });
    } else {
      router.removeParams(history, 'sorter');
    }
  }

  handleBetweenSearch() {
    const { history } = this.props;

    const { from, to } = this.state;

    router.setParams(history, { between: this.state.filter, from, to });
  }

  handleRangeChange(e, name) {
    this.setState({ [name]: e.target.value });
  }

  clearFilter() {
    this.setState({});

    router.removeParams(
      this.props.history,
      'between',
      'from',
      'to',
      'sorter',
      'productCode'
    );
  }

  renderFilter(type, requestedProducts) {
    const { productCode, filter, from, to } = this.state;

    const materialCodeOptions = requestedProducts.map(product => (
      <Option key={product.code} value={product.code}>
        {product.code}
      </Option>
    ));

    if (type === 'trfq') {
      return null;
    }

    return (
      <Col sm={24} xl={6} lg={7}>
        <Card title="OT Material code">
          <Select
            value={productCode}
            showSearch
            style={{ width: '100%' }}
            placeholder="Select a material code"
            optionFilterProp="children"
            onChange={this.handleProductCodeChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {materialCodeOptions}
          </Select>
        </Card>

        <Card className="margin" title="Filter">
          <Select
            value={filter}
            disabled={productCode.length < 1}
            placeholder="Select a filter"
            onChange={this.handleFilterChange}
            style={{ width: '100%' }}
          >
            <Option value="minTotalPrice">By minimum total price</Option>
            <Option value="minUnitPrice">By minimum unit price</Option>
            <Option value="totalPrice">In between values (total price)</Option>
            <Option value="unitPrice">In between values (unit price)</Option>
          </Select>

          <div
            className={
              filter === 'totalPrice' || filter === 'unitPrice'
                ? 'margin'
                : 'hidden'
            }
          >
            <Input
              type="number"
              placeholder="From"
              style={{ width: 'calc(50% - 7px)' }}
              value={from}
              onChange={e => this.handleRangeChange(e, 'from')}
            />
            &nbsp;~&nbsp;
            <Input
              type="number"
              placeholder="To"
              style={{ width: 'calc(50% - 7px)' }}
              value={to}
              onChange={e => this.handleRangeChange(e, 'to')}
            />
            <Button
              onClick={this.handleBetweenSearch}
              className="margin"
              type="primary"
              style={{ width: '100%' }}
            >
              Apply filter
            </Button>
          </div>
        </Card>
        <Button
          onClick={this.clearFilter}
          className="margin"
          style={{ width: '100%' }}
        >
          <Icon type="close" />
          Clear filter
        </Button>
      </Col>
    );
  }

  renderOperations(type, status) {
    const { rfqBidSummaryReportLoading } = this.props;

    const buttons = [
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

    if (type === 'rfq') {
      buttons.push(
        <Button
          onClick={this.bidSummaryReport}
          loading={rfqBidSummaryReportLoading}
          key={0}
        >
          Bid summary list
          {!rfqBidSummaryReportLoading ? <Icon type="file-excel" /> : ''}
        </Button>
      );
    }

    return buttons;
  }

  renderResponseModal(record) {
    const tenderDetail = this.props.tenderDetail || {};
    const { type } = tenderDetail;

    if (type === 'trfq') {
      const respondedServiceFiles = record.respondedServiceFiles || [];

      return (
        <Table
          size="small"
          columns={[
            {
              title: 'File',
              key: Math.random(),
              render: row => {
                return (
                  <a href={readFileUrl(row.url)} target="__blank">
                    {row.name}
                  </a>
                );
              }
            }
          ]}
          rowKey={() => Math.random()}
          dataSource={respondedServiceFiles}
        />
      );
    }

    const requestedProducts = tenderDetail.requestedProducts || [];
    const respondedProducts = record.respondedProducts || [];

    const responseColumns = [
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
          <a
            href="#download"
            onClick={() => window.open(readFileUrl(record.file.url))}
            target="__blank"
          >
            Download
          </a>
        )
      }
    ];

    return (
      <Table
        columns={[...rfqRequestColumns, ...responseColumns]}
        rowKey={() => Math.random()}
        dataSource={respondedProducts.map((product, index) => ({
          ...product,
          ...requestedProducts[index]
        }))}
      />
    );
  }

  render() {
    const tenderDetail = this.props.tenderDetail || {};
    const { type, status } = tenderDetail;
    const requestedProducts = tenderDetail.requestedProducts || [];

    return (
      <div>
        {this.renderStats()}
        <Row gutter={24}>
          {this.renderFilter(type, requestedProducts)}

          <Col
            sm={24}
            xl={type === 'trfq' ? 24 : 18}
            lg={type === 'trfq' ? 24 : 17}
          >
            {this.renderTable({
              tableOperations: this.renderOperations(type, status)
            })}
          </Col>
        </Row>
      </div>
    );
  }
}

Rfq.propTypes = {
  award: PropTypes.func,
  downloadReport: PropTypes.func,
  bidSummaryReportLoading: PropTypes.bool,
  data: PropTypes.array
};

Rfq.contextTypes = {
  systemConfig: PropTypes.object
};

export default withRouter(Rfq);
