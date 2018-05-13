/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Row, Col, Button, Icon, message } from 'antd';
import { Search } from 'modules/common/components';
import Common from './Common';
import Sidebar from './Sidebar';
import { MassEmail } from 'modules/companies/containers';

class Base extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      checkedCount: 0,
      selectedSuppliers: []
    };

    this.handleSend = this.handleSend.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(companyIds, selectedSuppliers) {
    this.setState({ selectedSuppliers });

    this.onSelectedCompaniesChange(companyIds);
  }

  handleSend(path) {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier to continue!')
      : this.props.history.push(path, { supplierIds: selectedCompanies });
  }

  renderFinanceStat(prev, current) {
    const amount = current.amount.toLocaleString();

    let className = 'not-changed';

    if (prev && current.amount > prev.amount) {
      className = 'up';
    }

    if (prev && current.amount < prev.amount) {
      className = 'down';
    }

    return (
      <span className={`finance-stat ${className}`}>
        <span className="year">{current.year}</span> - {amount}
      </span>
    );
  }

  render() {
    const {
      exportCompanies,
      exportLoading,
      exportCompany,
      totalCount
    } = this.props;

    const { selectedCompanies, selectedSuppliers } = this.state;

    const columns = this.getWrappedColumns(
      [
        {
          title: 'Qualification status',
          width: 40,
          dataIndex: 'qualificationStatusDisplay'
        },
        {
          title: 'Validation status',
          width: 40,
          dataIndex: 'productsInfoValidationStatusDisplay'
        },
        {
          title: 'Financial status',
          width: 40,
          render: record => {
            const { financialInfo } = record;

            let { annualTurnover } = financialInfo || {};

            if (!annualTurnover || annualTurnover.length !== 3) {
              return 'n/a';
            }

            annualTurnover = [...annualTurnover].sort(
              (a, b) => a.year > b.year
            );

            const [first, second, third] = annualTurnover;

            return (
              <div>
                {this.renderFinanceStat(null, first)}
                {this.renderFinanceStat(first, second)}
                {this.renderFinanceStat(second, third)}
              </div>
            );
          }
        },
        {
          title: 'Block status',
          width: 40,
          render: record => (record.isBlocked ? 'Yes' : '-')
        },
        {
          title: 'Due dilligence',
          width: 40,
          render: record =>
            record.lastDueDiligence && record.lastDueDiligence.file ? (
              <a href={record.lastDueDiligence.file.url} target="_blank">
                View
              </a>
            ) : (
              'n/a'
            )
        },
        {
          title: 'DIFOT score (average)',
          width: 40,
          render: record =>
            record.averageDifotScore
              ? `${record.averageDifotScore.toFixed(1)}%`
              : '-',
          sorter: true,
          key: 'averageDifotScore'
        }
      ],
      [
        {
          title: 'Supplier profile',
          width: 40,
          render: record => (
            <div>
              <a href={`/view-registration/${record._id}`} target="__blank">
                View
              </a>
              &nbsp;|&nbsp;
              <a onClick={() => exportCompany(record._id)}>Export</a>
            </div>
          )
        }
      ]
    );

    return (
      <Row gutter={16}>
        <Sidebar
          suppliersCount={totalCount}
          checkedCount={selectedCompanies && selectedCompanies.length}
        />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <MassEmail suppliers={selectedSuppliers} />

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

            {this.renderTable({
              rowSelection: {
                selectedCompanies,
                onChange: this.handleCheck
              },
              columns
            })}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Base);
