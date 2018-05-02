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
      responseModal: { visible: false, data: [] },
      regretLetterModal: { visible: false },
      regretLetterContent: ''
    };

    this.showResponsesModal = this.showResponsesModal.bind(this);
    this.hideResponsesModal = this.hideResponsesModal.bind(this);
    this.renderViewResponse = this.renderViewResponse.bind(this);
    this.toggleRegretLetterModal = this.toggleRegretLetterModal.bind(this);
    this.handleRegretLetterChange = this.handleRegretLetterChange.bind(this);
    this.handleSendRegretLetters = this.handleSendRegretLetters.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.showRequestedSuppliers = this.showRequestedSuppliers.bind(this);
  }

  getPercent(requestedCount, count) {
    if (count) return count / requestedCount * 100;
    else return 0;
  }

  setFilter(name) {
    router.setParams(this.props.history, {
      filter: name
    });
  }

  showRequestedSuppliers(suppliers) {
    router.removeParams(this.props.history, 'filter');
    const requestedSuppliers = suppliers.map(supplier => ({ supplier }));
    this.setState({ requestedSuppliers });
  }

  getTitle() {
    const filter = router.getParam(this.props.history, 'filter');

    if (filter === 'isNotInterested') return 'Not intereseted';

    if (filter === 'isNotResponded') return 'Not responded';

    return 'Submitted';
  }

  showResponsesModal(record) {
    const { supplier, respondedDocuments, respondedProducts } = record;

    this.setState({
      responseModal: {
        visible: true,
        title: supplier ? supplier.basicInfo.enName : '',
        data:
          respondedDocuments.length > 0
            ? this.generateEoiData(supplier, respondedDocuments)
            : respondedProducts
      }
    });
  }

  generateEoiData(supplier, respondedDocuments) {
    const {
      basicInfo: {
        certificateOfRegistration,
        corporateStructure,
        totalNumberOfEmployees
      },
      businessInfo: { doesHaveCodeEthicsFile },
      healthInfo: { areHSEResourcesClearlyIdentifiedFile },
      shareholderInfo: { attachments }
    } = supplier;

    return [
      ...respondedDocuments,
      {
        name: 'State registration certifcate (copy)',
        file: certificateOfRegistration,
        isSubmitted: certificateOfRegistration !== null
      },
      {
        name: 'HSE policy & procedures (copy)',
        file: areHSEResourcesClearlyIdentifiedFile,
        isSubmitted: areHSEResourcesClearlyIdentifiedFile !== null
      },
      {
        name: 'Business Code of Conduct (copy)',
        file: doesHaveCodeEthicsFile,
        isSubmitted: doesHaveCodeEthicsFile !== null
      },
      {
        name: 'Ownership/ shareholder information',
        file: attachments,
        isSubmitted: true
      },
      {
        name: 'Organization structure & Total manpower',
        file: null,
        isSubmitted: true,
        notes: `${corporateStructure}, ${totalNumberOfEmployees} employees`
      }
    ];
  }

  hideResponsesModal() {
    this.setState({ responseModal: { visible: false, data: [] } });
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
        dataIndex: 'supplier.basicInfo.enName',
        width: 160
      },
      {
        title: 'Vendor number',
        dataIndex: 'supplier.basicInfo.sapNumber',
        width: 160
      },
      {
        title: 'Status',
        width: 40,
        render: record => (record.status ? record.status : 'On time')
      },
      {
        title: 'Provided information',
        width: 40,
        render: this.renderViewResponse
      },
      { title: 'Provided file', width: 40, dataIndex: 'file' },
      {
        title: 'Contact person',
        width: 40,
        dataIndex: 'supplier.contactInfo.name'
      },
      { title: 'Email', width: 40, dataIndex: 'supplier.contactInfo.email' },
      { title: 'Phone', width: 40, dataIndex: 'supplier.contactInfo.phone' }
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
      notRespondedCount,
      supplierIds
    } = tenderDetail;

    return (
      <Row gutter={24}>
        <Col key={1} lg={6} sm={12}>
          <NumberCard
            icon="message"
            title="Invited"
            color={colors[3]}
            number={requestedCount}
            onClick={() =>
              this.props.getSuppliersByIds(
                supplierIds,
                this.showRequestedSuppliers
              )
            }
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
            title="Not intereseted"
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

  renderTable(args) {
    //args passed from Rfq.js and Eoi.js
    const {
      requestColumns = [],
      responseColumns = [],
      requestedData = [],
      tableOperations
    } = args;
    const {
      loading,
      onChange,
      regretLetterModalVisible,
      notRespondedSuppliers
    } = this.props;
    const {
      selectedCompanies,
      responseModal,
      regretLetterModal,
      regretLetterContent,
      requestedSuppliers
    } = this.state;
    const data = this.props.data || [];
    const tenderDetail = this.props.tenderDetail || {};
    const queryParams = this.props.queryParams || {};
    const { winnerId, sentRegretLetter, status } = tenderDetail;

    let responseRows =
      queryParams.filter === 'isNotResponded' ? notRespondedSuppliers : data;

    if (!queryParams.filter && requestedSuppliers) {
      responseRows = requestedSuppliers;
    }

    const responseData = responseModal.data.map((row, index) => ({
      ...row,
      ...requestedData[index]
    }));

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
          <Button
            disabled={sentRegretLetter || ['open', 'draft'].includes(status)}
            onClick={this.toggleRegretLetterModal}
          >
            Send regret letter
            <Icon type="mail" />
          </Button>
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
          dataSource={status !== 'open' ? responseRows : []}
          pagination={false}
          loading={loading}
          scroll={{ x: 1200 }}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />
        <Paginator total={10} />

        <Modal
          title={`${responseModal.title}'s response`}
          visible={responseModal.visible}
          onCancel={this.hideResponsesModal}
          footer={null}
          width="100%"
          style={{ top: 16 }}
        >
          <Table
            columns={[...requestColumns, ...responseColumns]}
            rowKey={() => Math.random()}
            dataSource={responseData}
          />
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
  getSuppliersByIds: PropTypes.func
};

export default Tender;
