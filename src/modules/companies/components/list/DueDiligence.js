/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, Button } from 'antd';
import { Uploader } from 'modules/common/components';
import Common from './Common';
import Sidebar from './Sidebar';
import Search from './Search';

class DueDiligence extends Common {
  constructor(props) {
    super(props);

    this.reports = {};
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data && nextProps.data) {
      nextProps.data.forEach(record => {
        this[`${record._id}Upload`] = file => {
          let value = { name: file.name, url: file.response };

          if (file.status === 'removed') {
            value = null;
          }

          this.reports[record._id] = value;
        };
      });
    }
  }

  render() {
    const { data, pagination, loading, onChange, addDueDiligence } = this.props;
    const { selectedCompanies } = this.state;

    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
      {
        title: 'Report',
        render: record => {
          const lastDueDiligence = record.lastDueDiligence || {};
          const file = lastDueDiligence.file || {};

          return (
            <Uploader
              initialFile={file}
              onReceiveFile={(...args) => this[`${record._id}Upload`](...args)}
            />
          );
        }
      },
      { title: 'Company administrators', dataIndex: '' },
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

              <Button onClick={() => addDueDiligence(this.reports)}>
                Save
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
        </Col>
      </Row>
    );
  }
}

export default withRouter(DueDiligence);
