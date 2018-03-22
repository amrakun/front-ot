/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Icon, message, Modal, Input } from 'antd';
import { Search, Editor } from 'modules/common/components';
import Common from './Common';
import Sidebar from './Sidebar';

class Base extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      emailContent: '',
      emailSubject: '',
      emailModalVisible: false,
      checkedCount: 0
    };

    this.handleSend = this.handleSend.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.showEmailModal = this.showEmailModal.bind(this);
    this.hideEmailModal = this.hideEmailModal.bind(this);
    this.handleEmailContentChange = this.handleEmailContentChange.bind(this);
    this.handleEmailSubjectChange = this.handleEmailSubjectChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(companies) {
    this.setState({ checkedCount: companies.length });

    this.onSelectedCompaniesChange(companies);
  }

  handleSend(path) {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier to continue!')
      : this.props.history.push(path, { supplierIds: selectedCompanies });
  }

  sendEmail() {
    const { selectedCompanies, emailContent, emailSubject } = this.state;

    this.props.sendMassEmail({
      supplierIds: selectedCompanies,
      content: emailContent,
      subject: emailSubject
    });

    this.hideEmailModal();
  }

  handleEmailContentChange(value) {
    this.setState({ emailContent: value });
  }

  handleEmailSubjectChange(e) {
    this.setState({ emailSubject: e.target.value });
  }

  showEmailModal() {
    this.setState({ emailModalVisible: true });
  }

  hideEmailModal() {
    this.setState({ emailModalVisible: false });
  }

  render() {
    const {
      exportCompanies,
      exportLoading,
      exportCompany,
      totalCount
    } = this.props;

    const {
      selectedCompanies,
      emailModalVisible,
      emailContent,
      checkedCount
    } = this.state;

    const columns = this.getWrappedColumns([
      {
        title: 'Registration',
        width: 40,
        render: record => (
          <Link to={`/view-registration/${record._id}`}>View</Link>
        )
      },
      {
        title: 'Qualification status',
        width: 40,
        render: record => (record.isQualified ? 'Yes' : 'No')
      },
      {
        title: 'Validation status',
        width: 40,
        render: record => (record.isProductsInfoValidated ? 'Yes' : '-')
      },
      {
        title: 'Due dilligence',
        width: 40,
        render: record =>
          record.lastDueDiligence && record.lastDueDiligence.file ? (
            <a href={record.lastDueDiligence.file.url} target="_blank">
              Yes
            </a>
          ) : (
            '-'
          )
      },
      {
        title: 'DIFOT score (average)',
        width: 40,
        render: record =>
          record.averageDifotScore ? `${record.averageDifotScore}%` : '-',
        sorter: true,
        key: 'averageDifotScore'
      },
      {
        title: 'Blocking',
        width: 40,
        render: record => (record.isBlocked ? 'Yes' : '-')
      },
      {
        title: 'Export profile',
        width: 40,
        render: record => (
          <a onClick={() => exportCompany(record._id)}>Export</a>
        )
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={totalCount} checkedCount={checkedCount} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={this.showEmailModal}>Send email</Button>

              <Button onClick={() => this.handleSend('/eoi/publish')}>
                Send EOI
              </Button>

              <Button onClick={() => this.handleSend('/rfq/publish')}>
                Send RFQ
              </Button>

              <Button
                loading={exportLoading}
                onClick={() => exportCompanies(selectedCompanies)}
              >
                Export to excel
                <Icon type="file-excel" />
              </Button>
            </div>

            {this.renderTable({
              rowSelection: {
                selectedCompanies,
                onChange: this.handleCheck
              },
              columns
            })}
          </Card>

          <Modal
            title={`Sending email to "${selectedCompanies.length}" suppliers`}
            visible={emailModalVisible}
            onCancel={this.hideEmailModal}
            onOk={this.sendEmail}
            width="50%"
            okText="Send"
          >
            <Input
              onChange={this.handleEmailSubjectChange}
              placeholder="Subject"
            />
            <Editor
              content={emailContent}
              onEmailContentChange={this.handleEmailContentChange}
            />
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Base);
