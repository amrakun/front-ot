/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import {
  Card,
  Row,
  Col,
  Button,
  Icon,
  DatePicker,
  Divider,
  Modal,
  List
} from 'antd';
import { Uploader, Search } from 'modules/common/components';
import { Common, Sidebar } from 'modules/companies/components';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';

class DueDiligence extends Common {
  constructor(props) {
    super(props);

    this.state = {
      filesModal: {
        visible: false,
        data: []
      }
    };

    this.reports = {};
    this.showFilesModal = this.showFilesModal.bind(this);
    this.hideFilesModal = this.hideFilesModal.bind(this);
  }

  showFilesModal(files) {
    this.setState({ filesModal: { visible: true, data: files } });
  }

  hideFilesModal() {
    this.setState({ filesModal: { visible: false, data: [] } });
  }

  handleUpload(files, id) {
    this.reports[id] = { ...this.reports[id], file: files[0] };
  }

  handleDateChange(date, id) {
    this.reports[id] = { ...this.reports[id], expireDate: date };
  }

  renderStatus(record) {
    const lastDueDiligence = record.lastDueDiligence || {};
    const date = lastDueDiligence.expireDate;

    return moment().diff(moment(date)) < -1 ? 'Yes' : '-';
  }

  renderFiles(record) {
    const lastDueDiligence = record.lastDueDiligence || {};
    const last = lastDueDiligence.file;

    const files = record.dueDiligences;

    const render = [];

    if (last) {
      render.push(
        <a key={0} href={last.url} target="_blank">
          Last
        </a>
      );

      if (files && files.length > 0) {
        render.push(<Divider key={1} type="vertical" />);
        render.push(
          <a key={2} onClick={() => this.showFilesModal(files)}>
            Previous
          </a>
        );
      }
    } else {
      return '-';
    }

    return render;
  }

  render() {
    const { totalCount, addDueDiligence, exportExcel } = this.props;
    const { selectedCompanies, filesModal } = this.state;

    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName', width: 160 },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber', width: 100 },
      { title: 'Tier type', dataIndex: 'tierType', width: 40 },
      {
        title: 'Status',
        width: 40,
        render: record => this.renderStatus(record)
      },
      {
        title: 'Report',
        width: 134,
        render: record => (
          <Uploader onChange={files => this.handleUpload(files, record._id)} />
        )
      },
      {
        title: 'Expiration date',
        width: 134,
        render: record => {
          const lastDueDiligence = record.lastDueDiligence || {};
          const date = lastDueDiligence.expireDate;

          return (
            <DatePicker
              defaultValue={date && moment(date)}
              format={dateFormat}
              onChange={value => this.handleDateChange(value, record._id)}
            />
          );
        }
      },
      {
        title: 'Report file',
        width: 80,
        render: record => this.renderFiles(record)
      },
      {
        title: 'Submission date',
        width: 60,
        render: record => {
          const lastDueDiligence = record.lastDueDiligence || {};
          const file = lastDueDiligence.file;

          return file ? moment(lastDueDiligence.date).format(dateFormat) : '-';
        }
      },
      { title: 'Contact person', dataIndex: 'contactInfo.name', width: 60 },
      { title: 'Email address', dataIndex: 'contactInfo.email', width: 60 },
      { title: 'Phone number', dataIndex: 'contactInfo.phone', width: 60 }
    ];

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={totalCount} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={exportExcel}>
                Export excel
                <Icon type="file-excel" />
              </Button>
              <Button
                type="primary"
                onClick={() => addDueDiligence(this.reports)}
              >
                Save
              </Button>
            </div>

            {this.renderTable({
              rowSelection: {
                selectedCompanies,
                onChange: this.onSelectedCompaniesChange
              },
              columns
            })}
          </Card>

          <Modal
            title="Previous reports"
            visible={filesModal.visible}
            onOk={this.hideFilesModal}
            onCancel={this.hideFilesModal}
          >
            <List
              bordered
              dataSource={filesModal.data}
              renderItem={item => (
                <List.Item>
                  <a key={0} href={item.file.url} target="_blank">
                    {moment(item.date).format(dateFormat)}
                  </a>

                  {item.createdUser &&
                    ` - ${item.createdUser.firstName}
                    ${item.createdUser.lastName},
                    ${item.createdUser.email}`}
                </List.Item>
              )}
            />
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default withRouter(DueDiligence);
