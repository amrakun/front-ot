/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Card, Input, Icon, Row, Col, Button, Modal } from 'antd';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/colors';
import { Editor } from 'modules/common/components';
import { regretLetterTemplate } from './constants';
import { Common } from 'modules/companies/components/';
import { Link } from 'react-router-dom';

const Search = Input.Search;

const propTypes = {
  data: PropTypes.object,
  filter: PropTypes.func,
  sendRegretLetter: PropTypes.func,
  sentRegretLetter: PropTypes.boolean,
  regretLetterModalVisible: PropTypes.boolean
};

class Tender extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      responseModal: { visible: false },
      regretLetterModal: { visible: false },
      regretLetterContent: regretLetterTemplate
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
    const { supplier, response } = record;

    this.setState({
      responseModal: {
        visible: true,
        title: supplier ? supplier.basicInfo.enName : '',
        data:
          response.respondedDocuments.length > 0
            ? response.respondedDocuments
            : response.respondedProducts
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
      { title: 'Qualification/audit status', dataIndex: 'audit' },
      {
        title: 'Validation status',
        render: record =>
          record.supplier.isProductsInfoValidated ? 'Yes' : '-'
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

  renderTender(args) {
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
    const data = this.props.data || {};
    const {
      submittedCount,
      requestedCount,
      notInterestedCount,
      notRespondedCount,
      winnerId,
      responses,
      sentRegretLetter,
      status
    } = data;

    console.log(responseModal.data);

    return (
      <div>
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
        <Card
          bordered={true}
          title={
            <div>
              Submitted companies for <strong>{data.name}</strong>
            </div>
          }
        >
          <div className="table-operations">
            <Search
              placeholder="Supplier name or SAP number"
              style={{ width: 200, float: 'left' }}
            />
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
            dataSource={responses}
            pagination={pagination}
            loading={loading}
            scroll={{ x: 2500 }}
            onChange={(pagination, filters, sorter) =>
              onChange(pagination, filters, sorter)
            }
          />
        </Card>

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
          title={`Sending regret letters to "${responses.length - 1}" bidders`}
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
      </div>
    );
  }
}

Tender.propTypes = propTypes;

export default Tender;
