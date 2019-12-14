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
  Tabs,
  Popconfirm,
} from 'antd';
import { rfqProductsColumns as rpc, rfqRequestColumns } from '../../../constants';
import Tender from './Tender';
import { readFileUrl } from 'modules/common/utils';
import { Uploader } from 'modules/common/components';
import router from 'modules/common/router';
import { TenderMessagesSingle } from 'modules/tender_messages/containers/';
import { Logs } from 'modules/tenders/containers/';

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
      awardAttachments: [],

      bidSummarySort: 'minTotalPrice',
      bidSummaryExchangeRate: 2500,
      showBidSummaryModal: false,
    };

    this.generateBidSummaryReport = this.generateBidSummaryReport.bind(this);
    this.toggleBidSummaryModal = this.toggleBidSummaryModal.bind(this);

    this.toggleAwardForm = this.toggleAwardForm.bind(this);
    this.award = this.award.bind(this);

    this.handleProductCodeChange = this.handleProductCodeChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleBetweenSearch = this.handleBetweenSearch.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.onChangeAwardAttachment = this.onChangeAwardAttachment.bind(this);
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
      attachments: awardAttachments,
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
        attachment: file,
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

    router.removeParams(this.props.history, 'between', 'from', 'to', 'sorter', 'productCode');
  }

  toggleBidSummaryModal() {
    const { showBidSummaryModal } = this.state;

    this.setState({ showBidSummaryModal: !showBidSummaryModal });
  }

  generateBidSummaryReport() {
    const { selectedCompanies, bidSummarySort, bidSummaryExchangeRate } = this.state;

    if (selectedCompanies.length < 1) {
      return message.error('Please select atleast one supplier!');
    }

    if (!bidSummarySort) {
      return message.error('Please select sort option!');
    }

    this.props.downloadReport(
      'rfqBidSummaryReport',
      {
        supplierIds: this.state.selectedCompanies,
        sort: bidSummarySort,
        exchangeRate: bidSummaryExchangeRate,
      },
      'Bid summary list has been downloaded'
    );
  }

  renderBidSummaryModal() {
    const { showBidSummaryModal, bidSummarySort, bidSummaryExchangeRate } = this.state;

    if (!showBidSummaryModal) {
      return null;
    }

    const onSortChange = value => {
      this.setState({ bidSummarySort: value });
    };

    const onExchangeRateChange = e => {
      this.setState({ bidSummaryExchangeRate: e.currentTarget.value });
    };

    return (
      <Modal
        title="Bid summary"
        visible={true}
        onCancel={this.toggleBidSummaryModal}
        footer={[
          <Button key="cancel" onClick={this.toggleBidSummaryModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={this.generateBidSummaryReport}>
            Ok
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Sort">
            <Select
              placeholder="Please select sort option"
              value={bidSummarySort}
              onChange={onSortChange}
            >
              <Option value="minTotalPrice">Min total price</Option>
              <Option value="completeness">Completeness</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Exchange rate - MNT to USD">
            <Input type="number" value={bidSummaryExchangeRate} onChange={onExchangeRateChange} />
          </Form.Item>
        </Form>
      </Modal>
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
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

          <div className={filter === 'totalPrice' || filter === 'unitPrice' ? 'margin' : 'hidden'}>
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
        <Button onClick={this.clearFilter} className="margin" style={{ width: '100%' }}>
          <Icon type="close" />
          Clear filter
        </Button>
      </Col>
    );
  }

  renderOperations() {
    const { rfqBidSummaryReportLoading, tenderDetail } = this.props;
    const { type, status } = tenderDetail || {};

    const buttons = [
      <Button type="primary" onClick={this.toggleAwardForm} disabled={status !== 'closed'} key={1}>
        Award
        <Icon type="trophy" />
      </Button>,
    ];

    if (type === 'rfq') {
      buttons.push(
        <Button onClick={this.toggleBidSummaryModal} loading={rfqBidSummaryReportLoading} key={0}>
          Bid summary list
          {!rfqBidSummaryReportLoading ? <Icon type="file-excel" /> : ''}
        </Button>
      );
    }

    buttons.push(this.renderDownloadFilesButton());

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
          <TextArea onChange={e => this.setState({ awardNote: e.target.value })} />
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
                <Uploader onChange={([file]) => this.onChangeAwardAttachment(company._id, file)} />
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
        maskClosable={false}
        width="50%"
        onCancel={this.toggleAwardForm}
        footer={[
          <Button key="cancel" onClick={this.toggleAwardForm}>
            Cancel
          </Button>,
          <Popconfirm
            key="popconfirm"
            title={`Awarding ${selectedCompanies.length} companies. Are you sure?`}
            onConfirm={this.award}
          >
            <Button key="submit" type="primary">
              Ok
            </Button>
          </Popconfirm>,
        ]}
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
              },
            },
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
        title: rpc.unitPrice,
        dataIndex: 'unitPrice',
        key: '10',
      },
      { title: rpc.totalPrice, dataIndex: 'totalPrice', key: '11' },
      { title: rpc.currency, dataIndex: 'currency', key: '12' },
      { title: rpc.leadTime, dataIndex: 'leadTime', key: '13' },
      { title: rpc.shippingTerms, dataIndex: 'shippingTerms', key: '14' },
      { title: rpc.alternative, dataIndex: 'alternative', key: '15' },
      {
        title: rpc.suggestedManufacturer,
        dataIndex: 'suggestedManufacturer',
        key: '8',
      },
      {
        title: rpc.suggestedManufacturerPart,
        dataIndex: 'suggestedManufacturerPartNumber',
        key: '9',
      },
      { title: rpc.comment, dataIndex: 'comment', key: '16' },
      {
        title: rpc.picture,
        key: '17',
        dataIndex: 'file',
        render: file =>
          file && file.url ? (
            <a href="#download" onClick={() => window.open(readFileUrl(file.url))} target="__blank">
              Download
            </a>
          ) : null,
      },
    ];

    return (
      <Table
        columns={[...rfqRequestColumns, ...responseColumns]}
        rowKey={() => Math.random()}
        scroll={{ x: 2000 }}
        dataSource={requestedProducts.map(product => {
          const respondedProduct = respondedProducts.find(rp => rp.productId === product.productId);

          return {
            ...product,
            ...respondedProduct,
          };
        })}
      />
    );
  }

  render() {
    const tenderDetail = this.props.tenderDetail || {};
    const { type } = tenderDetail;
    const requestedProducts = tenderDetail.requestedProducts || [];
    const { queryParams } = this.props;

    let main = (
      <>
        {this.renderStats()}
        {this.renderAwardModal()}
        <Row gutter={24}>
          {this.renderFilter(type, requestedProducts)}

          <Col sm={24} xl={type === 'trfq' ? 24 : 18} lg={type === 'trfq' ? 24 : 17}>
            {this.renderTable({
              tableOperations: this.renderOperations(),
            })}
          </Col>
        </Row>
      </>
    );

    if (tenderDetail.status === 'open') {
      main = undefined;
    }

    return (
      <Tabs defaultActiveKey={main ? '1' : '2'}>
        <TabPane disabled={!main} tab="Main" key="1">
          {main}
          {this.renderBidSummaryModal()}
        </TabPane>

        <TabPane tab="Messages" key="2">
          <TenderMessagesSingle tenderDetail={tenderDetail} queryParams={queryParams} />
        </TabPane>

        <TabPane tab="Log" key="3">
          <Logs _id={tenderDetail._id} queryParams={queryParams} />
        </TabPane>
      </Tabs>
    );
  } // end render()
}

Rfq.propTypes = {
  award: PropTypes.func,
  downloadReport: PropTypes.func,
  bidSummaryReportLoading: PropTypes.bool,
  data: PropTypes.array,
  tenderDetail: PropTypes.object,
  writeTenderLog: PropTypes.func,
};

Rfq.contextTypes = {
  systemConfig: PropTypes.object,
};

export default withRouter(Rfq);
