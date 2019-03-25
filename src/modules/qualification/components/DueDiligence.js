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
import { dateFormat } from 'modules/common/constants';
import { readFileUrl } from 'modules/common/utils';
import { Common, Sidebar } from 'modules/companies/components';
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

    if (!last) {
      return '-';
    }

    const render = [];

    render.push(
      <a key={0} href={readFileUrl(last.url)} target="__blank">
        Last
      </a>
    );

    if (files && files.length > 0) {
      render.push(<Divider key={1} type="vertical" />);
      render.push(
        <a href="#previous" key={2} onClick={() => this.showFilesModal(files)}>
          Previous
        </a>
      );
    }

    return render;
  }

  render() {
    const { totalCount, addDueDiligence, exportExcel } = this.props;
    const { selectedCompanies, filesModal } = this.state;

    const columns = this.getWrappedColumns([
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
              style={{ width: '115px' }}
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
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar
          suppliersCount={totalCount}
          checkedCount={selectedCompanies ? selectedCompanies.length : 0}
        />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={() => exportExcel(selectedCompanies)}>
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
            maskClosable={false}
            onCancel={this.hideFilesModal}
          >
            <List
              bordered
              dataSource={filesModal.data}
              renderItem={item => (
                <List.Item>
                  <a key={0} href={item.file.url} target="__blank">
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
