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
  Modal,
  Form,
  Row,
  Col,
  Card,
  Input,
  Tabs
} from 'antd';
import { rfqRequestColumns } from '../../../constants';
import Tender from './Tender';
import { readFileUrl } from 'modules/common/utils';
import { Uploader } from 'modules/common/components';
import router from 'modules/common/router';
import { TenderMessagesSingle } from 'modules/tender_messages/containers/';

const { Column } = Table;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

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
      to,
      showAwardForm: false,
      awardNote: '',
      awardAttachments: []
    };

    this.bidSummaryReport = this.bidSummaryReport.bind(this);
    this.toggleAwardForm = this.toggleAwardForm.bind(this);
    this.award = this.award.bind(this);
    this.handleProductCodeChange = this.handleProductCodeChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleBetweenSearch = this.handleBetweenSearch.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.onChangeAwardAttachment = this.onChangeAwardAttachment.bind(this);
  }

  bidSummaryReport() {
    const { selectedCompanies } = this.state;

    if (selectedCompanies.length < 1) {
      return message.error('Please select atleast one supplier!');
    }

    this.props.downloadReport(selectedCompanies, 'rfqBidSummaryReport');
  }

  toggleAwardForm() {
    const { showAwardForm } = this.state;

    this.setState({ showAwardForm: !showAwardForm });
  }

  award() {
    const { selectedCompanies, awardNote, awardAttachments } = this.state;

    this.setState({ showAwardForm: false });

    this.props.award({
      supplierIds: selectedCompanies,
      note: awardNote,
      attachments: awardAttachments
    });
  }

  onChangeAwardAttachment(sId, file) {
    const { awardAttachments } = this.state;
    const prev = awardAttachments.find(supplierId => supplierId === sId);

    if (prev) {
      prev.attachment = file;
    } else {
      awardAttachments.push({
        supplierId: sId,
        attachment: file
      });
    }

    this.setState({ awardAttachments });
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
        onClick={this.toggleAwardForm}
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

  renderAwardModal() {
    const { tenderDetail } = this.props;
    const { type } = tenderDetail;
    const { showAwardForm, selectedCompanies = [] } = this.state;

    const selectedRows = this.getResponseRows()
      .filter(row => selectedCompanies.includes(row.supplier._id))
      .map(row => row.supplier);

    let content = (
      <>
        <Form.Item label="Note">
          <TextArea
            onChange={e => this.setState({ awardNote: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Attachments">
          <Table dataSource={selectedRows} rowKey={company => company._id}>
            <Column
              title="Supplier name"
              key="1"
              render={(text, company) => {
                return company.basicInfo.enName;
              }}
            />
            <Column
              title="File"
              key="2"
              render={(text, company) => (
                <Uploader
                  onChange={([file]) =>
                    this.onChangeAwardAttachment(company._id, file)
                  }
                />
              )}
            />
          </Table>
        </Form.Item>
      </>
    );

    if (type === 'trfq') {
      content = `Awarding "${selectedCompanies.length}" bidders`;
    }

    return (
      <Modal
        title="Award"
        visible={showAwardForm}
        onCancel={this.toggleAwardForm}
        onOk={this.award}
        width="50%"
      >
        {content}
      </Modal>
    );
  }

  renderResponseModal(record) {
    const tenderDetail = this.props.tenderDetail || {};
    const { type, rfqType } = tenderDetail;

    if (type === 'trfq' || rfqType === 'service') {
      const respondedFiles = record.respondedFiles || [];

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
          dataSource={respondedFiles}
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
      { title: 'Currency', dataIndex: 'currency', key: '12' },
      { title: 'Lead time', dataIndex: 'leadTime', key: '13' },
      { title: 'Shipping terms', dataIndex: 'shippingTerms', key: '14' },
      { title: 'Alternative', dataIndex: 'alternative', key: '15' },
      { title: 'Comment', dataIndex: 'comment', key: '16' },
      {
        title: 'Picture (if required)',
        key: '17',
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

    const main =
      tenderDetail.status === 'open' ? (
        undefined
      ) : (
        <>
          {this.renderStats()}
          {this.renderAwardModal()}
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
        </>
      );

    return (
      <Tabs defaultActiveKey={main ? '1' : '2'}>
        <TabPane disabled={!main} tab="Main" key="1">
          {main}
        </TabPane>
        <TabPane tab="Messages" key="2">
          <TenderMessagesSingle tenderDetail={tenderDetail} />
        </TabPane>
      </Tabs>
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
