/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Row, Col } from 'antd';
import { Common } from 'modules/companies/components';
import { Sidebar } from 'modules/companies/components';
import { Search } from 'modules/companies/components';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class Status extends Common {
  constructor(props) {
    super(props);

    this.reports = {};
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;

    const columns = this.getWrappedColumns([
      {
        title: 'Pre-qualification information',
        render: record => (
          <Link to={`/prequalification-status/${record._id}`}>View</Link>
        )
      },
      {
        title: 'Submission date',
        render: () => moment().format(dateFormat)
      },
      {
        title: 'Expiration date',
        render: () => moment().format(dateFormat)
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={18}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />
            </div>
            <div style={{ margin: '32px 0' }} />
            <Table
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
