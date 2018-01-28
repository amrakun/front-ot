/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Row, Col, Button, Icon, message } from 'antd';
import { Search } from 'modules/common/components';
import Common from './Common';
import Sidebar from './Sidebar';

class Base extends Common {
  constructor(props) {
    super(props);

    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(path) {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier to continue!')
      : this.props.history.push(path, { supplierIds: selectedCompanies });
  }

  render() {
    const {
      data,
      pagination,
      loading,
      onChange,
      exportCompanies,
      exportLoading,
      exportCompany
    } = this.props;
    const { selectedCompanies } = this.state;

    const columns = this.getWrappedColumns([
      {
        title: 'Registration',
        render: record => (
          <Link to={`/view-registration/${record._id}`}>View</Link>
        )
      },
      {
        title: 'Qualification status',
        render: record => (record.isQualified ? 'Yes' : 'No')
      },
      {
        title: 'Validation status',
        render: record => (record.isProductsInfoValidated ? 'Yes' : '-')
      },
      {
        title: 'Due dilligence',
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
        render: record =>
          record.averageDifotScore ? `${record.averageDifotScore}%` : '-',
        sorter: true,
        key: 'averageDifotScore'
      },
      { title: 'Blocking', render: record => (record.isBlocked ? 'Yes' : '-') },
      {
        title: 'Export profile',
        render: record => (
          <a onClick={() => exportCompany(record._id)}>Export</a>
        )
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={18}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

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

export default withRouter(Base);
