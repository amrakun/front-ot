/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, Button } from 'antd';
import Common from './Common';
import Sidebar from './Sidebar';
import Search from './Search';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class Validation extends Common {
  render() {
    const { data, pagination, loading, onChange, addValidation } = this.props;
    const { selectedCompanies } = this.state;

    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
      {
        title: 'Tier type',
        render: () => <a>View</a>
      },
      { title: 'Pre-qualification status', render: () => <span>Yes</span> },
      { title: 'Product/Service code', render: () => <span>Yes</span> },
      {
        title: 'Last validation date',
        render: () => moment().format(dateFormat)
      },
      {
        title: 'Last validation result',
        dataIndex: 'result'
      },
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

              <Button onClick={() => addValidation(this.reports)}>Save</Button>
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
              scroll={{ x: 1800 }}
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

export default withRouter(Validation);
