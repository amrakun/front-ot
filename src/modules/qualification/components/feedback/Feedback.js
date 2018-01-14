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
  message,
  List
} from 'antd';
import { Common } from 'modules/companies/components';
import { Sidebar } from 'modules/companies/components';
import { Search } from 'modules/companies/components';
import { Editor } from 'modules/common/components';
import moment from 'moment';
import { dateFormat, dateTimeFormat } from 'modules/common/constants';
import { labels } from './constants';

class Feedback extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      feedbackModalVisible: false,
      feedbackContent: 'asf',
      feedbackCloseDate: moment(),
      viewModalVisible: false,
      viewModalData: {}
    };

    this.addFeedback = this.addFeedback.bind(this);
    this.handleFeedbackContentChange = this.handleFeedbackContentChange.bind(
      this
    );
    this.toggleFeedbackModal = this.toggleFeedbackModal.bind(this);
    this.handleCloseDateChange = this.handleCloseDateChange.bind(this);
    this.toggleViewModal = this.toggleViewModal.bind(this);
    this.viewFeedbackInfo = this.viewFeedbackInfo.bind(this);
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

  viewFeedbackInfo(feedback) {
    this.setState({
      viewModalData: feedback.supplierResponse,
      viewModalVisible: true
    });
  }

  toggleViewModal(value) {
    this.setState({ viewModalVisible: value });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const {
      selectedCompanies,
      feedbackModalVisible,
      feedbackContent,
      feedbackCloseDate,
      viewModalVisible,
      viewModalData
    } = this.state;

    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
      { title: 'Tier type', render: () => <span>Yes</span> },
      { title: 'Pre-qualification status', render: () => <span>Yes</span> },
      {
        title: 'Last feedback date',
        render: record =>
          record.lastFeedback
            ? moment(record.lastFeedback.closeDate).format(dateFormat)
            : '-'
      },
      {
        title: 'Last feedback information',
        render: record => {
          const lfd = record.lastFeedback;
          if (lfd && lfd.supplierResponse) {
            return (
              <a onClick={() => this.viewFeedbackInfo(record.lastFeedback)}>
                View
              </a>
            );
          } else return '-';
        }
      },
      { title: 'Contact person', dataIndex: 'contactInfo.name' },
      { title: 'Email address', dataIndex: 'contactInfo.email' },
      { title: 'Phone number', dataIndex: 'contactInfo.phone' }
    ];

    let responseItemList = [];
    Object.keys(viewModalData).forEach(key => {
      if (!['_id', '__typename'].includes(key)) {
        responseItemList.push({
          title: key,
          description: viewModalData[key]
        });
      }
    });

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={18}>
          <Card title="Suppliers">
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
              format={dateTimeFormat}
              placeholder="Choose close date"
              onChange={this.handleCloseDateChange}
            />
            <p />
            <Editor
              content={feedbackContent}
              onEmailContentChange={this.handleFeedbackContentChange}
            />
          </Modal>

          <Modal
            title="Last feedback"
            visible={viewModalVisible}
            onCancel={() => this.toggleViewModal(false)}
            footer={null}
            bodyStyle={{ height: '70vh', overflow: 'scroll' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={responseItemList}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={labels[item.title]}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Feedback);
