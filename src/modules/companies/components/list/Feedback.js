/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import {
  Table,
  Card,
  Row,
  Col,
  Button,
  Icon,
  Modal,
  DatePicker,
  message
} from 'antd';
import Common from './Common';
import Sidebar from './Sidebar';
import Search from './Search';
import { Editor } from 'modules/common/components';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class Feedback extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      feedbackModalVisible: false,
      feedbackContent: 'asf',
      feedbackCloseDate: moment()
    };

    this.addFeedback = this.addFeedback.bind(this);
    this.handleFeedbackContentChange = this.handleFeedbackContentChange.bind(
      this
    );
    this.toggleFeedbackModal = this.toggleFeedbackModal.bind(this);
    this.handleCloseDateChange = this.handleCloseDateChange.bind(this);
  }

  addFeedback() {
    const { addFeedback } = this.props;
    const {
      selectedCompanies,
      feedbackCloseDate,
      feedbackContent
    } = this.state;

    addFeedback({ selectedCompanies, feedbackCloseDate, feedbackContent });
    this.setState({ feedbackModalVisible: false });
  }

  toggleFeedbackModal(value) {
    if (value && this.state.selectedCompanies.length < 1)
      message.error('Please select atleast one supplier');
    else this.setState({ feedbackModalVisible: value });
  }

  handleFeedbackContentChange(content) {
    this.setState({ feedbackContent: content });
  }

  handleCloseDateChange(value) {
    this.setState({ feedbackCloseDate: value });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const {
      selectedCompanies,
      feedbackModalVisible,
      feedbackContent,
      feedbackCloseDate
    } = this.state;

    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
      {
        title: 'Last feedback date',
        render: record =>
          record.lastFeedback
            ? moment(record.lastFeedback.closeDate).format(dateFormat)
            : '-'
      },
      { title: 'Last feedback information', dataIndex: 'lfinfo' },
      { title: 'Contact person', dataIndex: 'contactInfo.name' },
      { title: 'Email address', dataIndex: 'contactInfo.email' },
      { title: 'Phone number', dataIndex: 'contactInfo.phone' },
      { title: 'Registration', render: () => <span>Yes</span> },
      { title: 'Pre-qualification status', render: () => <span>Yes</span> }
    ];

    return (
      <Row gutter={16}>
        <Sidebar />

        <Col span={18}>
          <Card title="Companies">
            <div className="table-operations">
              <Search />

              <Button onClick={() => this.toggleFeedbackModal(true)}>
                Send success feedback
                <Icon type="mail" />
              </Button>
            </div>

            <Table
              rowSelection={{
                selectedCompanies,
                onChange: this.onSelectedCompaniesChange
              }}
              columns={columns}
              rowKey={record => record._id}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              scroll={{ x: 1600 }}
              onChange={(pagination, filters, sorter) =>
                onChange(pagination, filters, sorter)
              }
            />
          </Card>

          <Modal
            title="Send success feedback"
            visible={feedbackModalVisible}
            onCancel={() => this.toggleFeedbackModal(false)}
            onOk={this.addFeedback}
            width="50%"
          >
            <label>Close date: </label>
            <DatePicker
              defaultValue={feedbackCloseDate}
              showTime={{ format: 'HH:mm' }}
              format={dateFormat}
              placeholder="Choose close date"
              onChange={this.handleCloseDateChange}
            />
            <p />
            <Editor
              content={feedbackContent}
              onEmailContentChange={this.handleFeedbackContentChange}
            />
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Feedback);
