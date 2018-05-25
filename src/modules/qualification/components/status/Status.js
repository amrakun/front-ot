/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Row, Col, Button, Icon } from 'antd';
import { Common, Sidebar } from 'modules/companies/components';
import { Search } from 'modules/common/components';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';
import PropTypes from 'prop-types';
import { statusTabs } from 'modules/qualification/consts';
import { StatsTable } from 'modules/common/components';

class Status extends Common {
  constructor(props, context) {
    super(props, context);

    this.reports = {};
  }

  renderExpirationDate(date) {
    const { systemConfig } = this.context;
    const prequalificationDow = systemConfig.prequalificationDow || {};

    let d = date ? moment(date) : moment();

    return d
      .add(prequalificationDow.amount, `${prequalificationDow.duration}s`)
      .format(dateFormat);
  }

  renderStats() {
    const { prequalifiedStatusQuery } = this.props;

    const stats = prequalifiedStatusQuery.companiesPrequalifiedStatus || {};

    return <StatsTable stats={stats} tabs={statusTabs} />;
  }

  render() {
    const { generate, totalCount } = this.props;
    const { selectedCompanies } = this.state;

    const columns = this.getWrappedColumns(
      [
        {
          title: 'Submission date',
          render: record => {
            if (record.prequalifiedDate) {
              return moment(record.prequalifiedDate).format(dateFormat);
            }

            return '-';
          }
        },
        {
          title: 'Expiration date',
          render: record => this.renderExpirationDate(record.prequalifiedDate)
        }
      ],
      [
        {
          title: 'Actions',
          width: 40,
          render: record => (
            <div>
              <a href={`/prequalification-status/${record._id}`}>View</a>
            </div>
          )
        }
      ]
    );

    return (
      <Row gutter={16}>
        <Sidebar
          suppliersCount={totalCount}
          stats={this.renderStats()}
          checkedCount={selectedCompanies ? selectedCompanies.length : 0}
        />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={() => generate(selectedCompanies)}>
                Export excel
                <Icon type="file-excel" />
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
        </Col>
      </Row>
    );
  }
}

Status.contextTypes = {
  systemConfig: PropTypes.object
};

export default withRouter(Status);
