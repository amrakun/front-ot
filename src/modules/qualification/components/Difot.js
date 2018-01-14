/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, Button, Icon } from 'antd';
import { xlsxHandler } from 'modules/common/utils';
import { Common } from 'modules/companies/components';
import { Sidebar } from 'modules/companies/components';
import { Search } from 'modules/companies/components';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

class Difot extends Common {
  constructor(props) {
    super(props);

    this.handleImport = this.handleImport.bind(this);
  }

  handleImport(e) {
    xlsxHandler({
      e,
      success: data => {
        this.props.addDifotScores(data);
      }
    });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const { selectedCompanies } = this.state;

    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
      { title: 'Tier type', render: () => <span>-</span> },
      { title: 'Pre-qualification status', render: () => <span>Yes</span> },
      {
        title: 'DIFOT score',
        render: record => {
          if (record.lastDifotScore) {
            return <span>{record.lastDifotScore.amount}%</span>;
          }

          return <span>0%</span>;
        }
      },
      {
        title: 'Last DIFOT date',
        render: record =>
          record.lastDifotScore
            ? moment(record.lastDifotScore.date).format(dateFormat)
            : '-'
      },
      {
        title: 'Average DIFOT score',
        render: record => <span>{record.averageDifotScore || 0}%</span>
      },
      { title: 'Contact person', dataIndex: 'contactInfo.name' },
      { title: 'Email address', dataIndex: 'contactInfo.email' },
      { title: 'Phone number', dataIndex: 'contactInfo.phone' }
    ];

    const { REACT_APP_API_URL } = process.env;
    const templateUrl = `${
      REACT_APP_API_URL
    }/static/templates/difot_score.xlsx`;

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={18}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={() => window.open(templateUrl)}>
                Download template
                <Icon type="download" />
              </Button>

              <div className="upload-btn-wrapper">
                <Button>
                  Import DIFOT score <Icon type="file-excel" />
                </Button>
                <input type="file" onChange={this.handleImport} />
              </div>
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

export default withRouter(Difot);
