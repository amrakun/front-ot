/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, Button, Icon } from 'antd';
import { xlsxHandler } from 'modules/common/utils';
import { Common } from 'modules/companies/components';
import { Sidebar } from 'modules/companies/components';
import { Search } from 'modules/common/components';
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
        this.inputDifot.value = '';
      }
    });
  }

  render() {
    const { data, pagination, loading, onChange, generate } = this.props;
    const { selectedCompanies } = this.state;

    const columns = this.getWrappedColumns([
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
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={generate}>
                Download template
                <Icon type="download" />
              </Button>

              <div className="upload-btn-wrapper">
                <Button>
                  Import DIFOT score <Icon type="file-excel" />
                </Button>
                <input
                  type="file"
                  onChange={this.handleImport}
                  ref={el => (this.inputDifot = el)}
                />
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
