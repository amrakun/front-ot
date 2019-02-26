/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Card, Icon, Row, Col, Button, Modal } from 'antd';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/constants';
import { Search, Editor } from 'modules/common/components';
import { Common } from 'modules/companies/components/';
import { Paginator } from 'modules/common/components';
import router from 'modules/common/router';

class Tender extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      selectedCompanies: [],
      responseModal: { visible: false, record: null },
      regretLetterModal: { visible: false },
      regretLetterContent: '',
    };

    this.showResponsesModal = this.showResponsesModal.bind(this);
    this.hideResponsesModal = this.hideResponsesModal.bind(this);
    this.renderViewResponse = this.renderViewResponse.bind(this);
    this.toggleRegretLetterModal = this.toggleRegretLetterModal.bind(this);
    this.handleRegretLetterChange = this.handleRegretLetterChange.bind(this);
    this.handleSendRegretLetters = this.handleSendRegretLetters.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  getPercent(requestedCount, count) {
    if (count) {
      return (count / requestedCount) * 100;
    }

    return 0;
  }

  setFilter(name) {
    router.setParams(this.props.history, {
      filter: name,
      page: undefined,
      perPage: undefined,
    });
  }

  getTitle() {
    const filter = router.getParam(this.props.history, 'filter');

    if (filter === 'isNotInterested') return 'Not interested';

    if (filter === 'isNotResponded') return 'Not responded';

    return 'Submitted';
  }

  showResponsesModal(record) {
    const { supplier } = record;

    console.log(supplier)

    this.setState({
      responseModal: {
        visible: true,
        title: supplier && supplier.basicInfo ? supplier.basicInfo.enName : '',
        record,
      },
    });
  }

  hideResponsesModal() {
    this.setState({ responseModal: { visible: false, record: null } });
  }

  toggleRegretLetterModal() {
    const { regretLetterModal } = this.state;

    this.setState({
      regretLetterModal: { visible: !regretLetterModal.visible },
    });
  }

  handleSendRegretLetters() {
    this.props.sendRegretLetter(this.state.regretLetterContent);
  }

  handleRegretLetterChange(content) {
    this.setState({ regretLetterContent: content });
  }

  columns() {
    return [
      {
        title: 'Supplier name',
        dataIndex: 'supplier.basicInfo.enName',
      },
      {
        title: 'Vendor number',
        dataIndex: 'supplier.basicInfo.sapNumber',
      },
      {
        title: 'Prequalification status',
        dataIndex: 'supplier.prequalificationStatusDisplay',
      },
      {
        title: 'Status',
        render: record => (record.status ? record.status : 'On time'),
      },
      {
        title: 'Provided information',
        render: this.renderViewResponse,
      },
      {
        title: 'Contact person',
        dataIndex: 'supplier.contactInfo.name',
      },
      { title: 'Email', dataIndex: 'supplier.contactInfo.email' },
      { title: 'Phone', dataIndex: 'supplier.contactInfo.phone' },
    ];
  }

  renderViewResponse(text, record) {
    return (
      <a href="#view" onClick={() => this.showResponsesModal(record)}>
        View
      </a>
    );
  }

  renderStats() {
    const tenderDetail = this.props.tenderDetail || {};

    const { submittedCount, requestedCount, notInterestedCount, notRespondedCount } = tenderDetail;

    return (
      <Row gutter={24}>
        <Col key={1} lg={6} sm={12}>
          <NumberCard
            icon="message"
            title="Invited"
            color={colors[3]}
            number={requestedCount}
            onClick={() => this.setFilter('isInvited')}
          />
        </Col>
        <Col key={2} lg={6} sm={12}>
          <NumberCardLines
            icon="like-o"
            title="Submitted"
            color={colors[2]}
            number={submittedCount}
            percent={this.getPercent(requestedCount, submittedCount)}
            onClick={() => this.setFilter('isSubmitted')}
          />
        </Col>
        <Col key={3} lg={6} sm={12}>
          <NumberCardLines
            icon="dislike-o"
            title="Not interested"
            color={colors[4]}
            number={notInterestedCount}
            percent={this.getPercent(requestedCount, notInterestedCount)}
            onClick={() => this.setFilter('isNotInterested')}
          />
        </Col>
        <Col key={4} lg={6} sm={12}>
          <NumberCardLines
            icon="question"
            title="Not responded"
            color={colors[5]}
            number={notRespondedCount}
            percent={this.getPercent(requestedCount, notRespondedCount)}
            onClick={() => this.setFilter('isNotResponded')}
          />
        </Col>
      </Row>
    );
  }

  getResponseRows() {
    const { notRespondedSuppliers, invitedSuppliers } = this.props;

    const data = this.props.data || [];
    const queryParams = this.props.queryParams || {};
    const { filter } = queryParams;

    let responseRows = data;

    if (filter === 'isNotResponded') {
      responseRows = notRespondedSuppliers;
    }

    if (filter === 'isInvited') {
      responseRows = invitedSuppliers;
    }

    return responseRows;
  }

  renderSendRegretLetterButton(tenderDetail) {
    const { sentRegretLetter, status } = tenderDetail;

    if (tenderDetail.type === 'eoi') {
      return null;
    }

    return (
      <Button
        disabled={sentRegretLetter || ['open', 'draft'].includes(status)}
        onClick={this.toggleRegretLetterModal}
      >
        Send regret letter
        <Icon type="mail" />
      </Button>
    )
  }

  renderTable(args) {
    const { tableOperations } = args;

    const { loading, totalCount, onChange, regretLetterModalVisible } = this.props;

    const { selectedCompanies, responseModal, regretLetterModal, regretLetterContent } = this.state;

    const data = this.props.data || [];
    const tenderDetail = this.props.tenderDetail || {};
    const { winnerIds = [], status } = tenderDetail;

    return (
      <Card
        bordered={true}
        title={
          <span>
            {this.getTitle()} companies for <strong>{tenderDetail.name}</strong>
          </span>
        }
      >
        <div className="table-operations">
          <Search placeholder="Supplier name or Vendor number" />
          {tableOperations}
          {this.renderSendRegretLetterButton(tenderDetail)}
        </div>

        <Table
          rowSelection={{
            selectedCompanies,
            onChange: this.onSelectedCompaniesChange,
          }}
          rowClassName={record => {
            if (winnerIds.includes(record.supplier._id)) return 'highlight';
          }}
          columns={this.columns()}
          rowKey={record => (record.supplier ? record.supplier._id : '')}
          dataSource={status !== 'open' ? this.getResponseRows() : []}
          pagination={false}
          loading={loading}
          scroll={{ x: 1200 }}
          onChange={(pagination, filters, sorter) => onChange(pagination, filters, sorter)}
        />
        <Paginator total={totalCount} />

        <Modal
          title={`${responseModal.title}'s response`}
          visible={responseModal.visible}
          onCancel={this.hideResponsesModal}
          footer={null}
          width="100%"
          style={{ top: 16 }}
        >
          {responseModal.record && this.renderResponseModal(responseModal.record)}
        </Modal>

        <Modal
          title={`Sending regret letters to "${data.length - 1}" bidders`}
          visible={
            regretLetterModalVisible !== undefined
              ? regretLetterModalVisible
              : regretLetterModal.visible
          }
          onCancel={this.toggleRegretLetterModal}
          onOk={this.handleSendRegretLetters}
          width="50%"
        >
          <Editor
            content={regretLetterContent}
            onEmailContentChange={this.handleRegretLetterChange}
          />
        </Modal>
      </Card>
    );
  }
}

Tender.propTypes = {
  data: PropTypes.array,
  filter: PropTypes.func,
  sendRegretLetter: PropTypes.func,
  sentRegretLetter: PropTypes.boolean,
  regretLetterModalVisible: PropTypes.boolean,
  notRespondedSuppliers: PropTypes.array,
};

export default Tender;
