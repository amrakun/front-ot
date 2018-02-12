/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Card, Icon, Row, Col, Button, Modal } from 'antd';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/constants';
import { Search, Editor } from 'modules/common/components';
import { Common } from 'modules/companies/components/';
import { Link } from 'react-router-dom';

class Tender extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      responseModal: { visible: false },
      regretLetterModal: { visible: false },
      regretLetterContent: ''
    };

    this.showResponsesModal = this.showResponsesModal.bind(this);
    this.hideResponsesModal = this.hideResponsesModal.bind(this);
    this.renderViewResponse = this.renderViewResponse.bind(this);
    this.toggleRegretLetterModal = this.toggleRegretLetterModal.bind(this);
    this.handleRegretLetterChange = this.handleRegretLetterChange.bind(this);
    this.handleSendRegretLetters = this.handleSendRegretLetters.bind(this);
  }

  getPercent(requestedCount, count) {
    if (count) return count / requestedCount * 100;
    else return 0;
  }

  showResponsesModal(record) {
    const { supplier, respondedDocuments, respondedProducts } = record;

    this.setState({
      responseModal: {
        visible: true,
        title: supplier ? supplier.basicInfo.enName : '',
        data:
          respondedDocuments.length > 0 ? respondedDocuments : respondedProducts
      }
    });
  }

  hideResponsesModal() {
    this.setState({ responseModal: { visible: false } });
  }

  toggleRegretLetterModal() {
    const { regretLetterModal } = this.state;
    this.setState({
      regretLetterModal: { visible: !regretLetterModal.visible }
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
        dataIndex: 'supplier.basicInfo.enName'
      },
      { title: 'Sap number', dataIndex: 'supplier.basicInfo.sapNumber' },
      {
        title: 'Tier type',
        render: () => <span>-</span>
      },
      {
        title: 'Pre-qualification status',
        render: record => (
          <Link to={`/prequalification-status/${record.supplier._id}?view`}>
            {record.supplier.isPrequalified ? 'Yes' : 'No'}
          </Link>
        )
      },
      {
        title: 'Qualification/audit status',
        render: record => (record.supplier.isQualified ? 'Yes' : 'No')
      },
      {
        title: 'Validation status',
        render: record =>
          record.supplier.isProductsInfoValidated ? 'Yes' : 'No'
      },
      {
        title: 'Due dilligence',
        render: record => {
          const { lastDueDiligence } = record.supplier;

          if (lastDueDiligence && lastDueDiligence.file) {
            return (
              <a href={lastDueDiligence.file.url} target="_blank">
                Yes
              </a>
            );
          } else return '-';
        }
      },
      {
        title: 'DIFOT score',
        render: record =>
          record.supplier.averageDifotScore
            ? `${record.supplier.averageDifotScore}%`
            : '-'
      },
      { title: 'Company size', dataIndex: 'size' },
      {
        title: 'Number of employees',
        dataIndex: 'supplier.basicInfo.totalNumberOfEmployees'
      },
      { title: 'Work experience', dataIndex: 'workExperience' },
      {
        title: 'Status',
        render: record => (record.status ? record.status : 'on time')
      },
      {
        title: 'Response information',
        render: this.renderViewResponse
      },
      { title: 'Uploaded file', dataIndex: 'file' },
      {
        title: 'Contact person',
        dataIndex: 'supplier.contactInfo.name'
      },
      { title: 'Email', dataIndex: 'supplier.contactInfo.email' },
      { title: 'Phone', dataIndex: 'supplier.contactInfo.phone' }
    ];
  }

  renderViewResponse(text, record) {
    return <a onClick={() => this.showResponsesModal(record)}>View</a>;
  }

  renderStats() {
    const tenderDetail = this.props.tenderDetail || {};
    const {
      submittedCount,
      requestedCount,
      notInterestedCount,
      notRespondedCount
    } = tenderDetail;

    return (
      <Row gutter={24}>
        <Col key={1} lg={6} sm={12}>
          <NumberCard
            icon="message"
            title="Requested"
            color={colors[3]}
            number={requestedCount}
          />
        </Col>
        <Col key={2} lg={6} sm={12}>
          <NumberCardLines
            icon="like-o"
            title="Submitted"
            color={colors[2]}
            number={submittedCount}
            percent={this.getPercent(requestedCount, submittedCount)}
          />
        </Col>
        <Col key={3} lg={6} sm={12}>
          <NumberCardLines
            icon="dislike-o"
            title="Not intereseted"
            color={colors[4]}
            number={notInterestedCount}
            percent={this.getPercent(requestedCount, notInterestedCount)}
          />
        </Col>
        <Col key={4} lg={6} sm={12}>
          <NumberCardLines
            icon="question"
            title="Not responded"
            color={colors[5]}
            number={notRespondedCount}
            percent={this.getPercent(requestedCount, notRespondedCount)}
          />
        </Col>
      </Row>
    );
  }

  renderTable(args) {
    //args passed from Rfq.js and Eoi.js
    const {
      requestColumns,
      responseColumns,
      requestedData,
      tableOperations
    } = args;
    const {
      pagination,
      loading,
      onChange,
      regretLetterModalVisible
    } = this.props;
    const {
      selectedCompanies,
      responseModal,
      regretLetterModal,
      regretLetterContent
    } = this.state;
    const data = this.props.data || [];
    const tenderDetail = this.props.tenderDetail || {};
    const { winnerId, sentRegretLetter, status } = tenderDetail;

    return (
      <Card
        bordered={true}
        title={
          <span>
            Submitted companies for <strong>{tenderDetail.name}</strong>
          </span>
        }
      >
        <div className="table-operations">
          <Search placeholder="Supplier name or SAP number" />
          <Button
            disabled={sentRegretLetter || ['open', 'draft'].includes(status)}
            onClick={this.toggleRegretLetterModal}
          >
            Send regret letter
            <Icon type="mail" />
          </Button>
          {tableOperations}
        </div>

        <Table
          rowSelection={{
            selectedCompanies,
            onChange: this.onSelectedCompaniesChange
          }}
          rowClassName={record => {
            if (record.supplier._id === winnerId) return 'highlight';
          }}
          columns={this.columns()}
          rowKey={record => (record.supplier ? record.supplier._id : '')}
          dataSource={status !== 'open' ? data : []}
          pagination={pagination}
          loading={loading}
          scroll={{ x: 2500 }}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />

        <Modal
          title={`${responseModal.title}'s response`}
          visible={responseModal.visible}
          onCancel={this.hideResponsesModal}
          footer={null}
          width="100%"
          style={{ top: 16 }}
        >
          <Row gutter={16}>
            {requestedData && (
              <Col span={8}>
                <Table
                  columns={requestColumns}
                  rowKey={() => Math.random()}
                  dataSource={requestedData}
                  scroll={{ x: 1100 }}
                />
              </Col>
            )}

            <Col span={requestedData ? 16 : 24}>
              <Table
                columns={responseColumns}
                rowKey={() => Math.random()}
                dataSource={responseModal.data}
                scroll={{ x: 1300 }}
              />
            </Col>
          </Row>
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
  regretLetterModalVisible: PropTypes.boolean
};

export default Tender;
