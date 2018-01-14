/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Row, Col } from 'antd';
import Common from './Common';
import Sidebar from './Sidebar';
import Search from './Search';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class Status extends Common {
  constructor(props) {
    super(props);

    this.reports = {};
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const { selectedCompanies } = this.state;

    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
      {
        title: 'Pre-qualification status',
        render: record => (
          <Link to={`/prequalification-status/${record._id}`}>View</Link>
        )
      },
      {
        title: 'Submission date',
        render: () => moment().format(dateFormat)
      },
      {
        title: 'Expiry date',
        render: () => moment().format(dateFormat)
      },
      { title: 'Registration', render: () => <span>Yes</span> },
      { title: 'Contact person', dataIndex: 'contactInfo.name' },
      { title: 'Email address', dataIndex: 'contactInfo.email' },
      { title: 'Phone number', dataIndex: 'contactInfo.phone' }
    ];

    return (
      <Row gutter={16}>
        <Sidebar />

        <Col span={18}>
          <Card title="Companies">
            <div className="table-operations">
              <Search />
            </div>
            <div style={{ margin: '32px 0' }} />
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

export default withRouter(Status);
