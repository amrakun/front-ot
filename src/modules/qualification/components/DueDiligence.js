/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, Button, Icon, DatePicker } from 'antd';
import { Uploader } from 'modules/common/components';
import { Common } from 'modules/companies/components';
import { Sidebar } from 'modules/companies/components';
import { Search } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';

class DueDiligence extends Common {
  constructor(props) {
    super(props);

    this.reports = {};
  }

  handleUpload(file, id) {
    let value = { name: file.name, url: file.response };

    if (file.status === 'removed') {
      value = null;
    }

    this.reports[id] = { ...this.reports[id], file: value };
  }

  handleDateChange(date, id) {
    this.reports[id] = { ...this.reports[id], expireDate: date };
  }

  render() {
    const {
      data,
      pagination,
      loading,
      onChange,
      addDueDiligence,
      exportExcel
    } = this.props;

    const columns = this.getWrappedColumns([
      {
        title: 'Report',
        render: record => (
          <Uploader
            onReceiveFile={args => this.handleUpload(args, record._id)}
          />
        )
      },
      {
        title: 'Expiration date',
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
        title: 'Last report file',
        render: record => {
          const lastDueDiligence = record.lastDueDiligence || {};
          const file = lastDueDiligence.file;

          return file ? (
            <a href={file.url} target="_blank">
              View
            </a>
          ) : (
            '-'
          );
        }
      },
      {
        title: 'Submission date',
        render: record => {
          const lastDueDiligence = record.lastDueDiligence || {};
          const file = lastDueDiligence.file;

          return file ? moment(lastDueDiligence.date).format(dateFormat) : '-';
        }
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={18}>
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

            <Table
              columns={columns}
              rowKey={record => record._id}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              scroll={{ x: 2000 }}
              onChange={(pagination, filters, sorter) =>
                onChange(pagination, filters, sorter)
              }
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(DueDiligence);
