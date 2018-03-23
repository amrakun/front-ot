/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { Common, Sidebar } from 'modules/companies/components';
import { Search } from 'modules/common/components';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';
import PropTypes from 'prop-types';

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

  render() {
    const { data } = this.props;

    const columns = [
      { title: 'Supplier name', dataIndex: 'basicInfo.enName' },
      { title: 'SAP number', dataIndex: 'basicInfo.sapNumber' },
      { title: 'Tier type', dataIndex: 'tierType' },
      {
        title: 'Pre-qualification information',
        render: record => (
          <Link to={`/prequalification-status/${record._id}`}>
            {record.isPrequalified ? 'Yes' : 'No'}
          </Link>
        )
      },
      {
        title: 'Submission date',
        render: record => moment(record.prequalifiedDate).format(dateFormat)
      },
      {
        title: 'Expiration date',
        render: record => this.renderExpirationDate(record.prequalifiedDate)
      },
      { title: 'Contact person', dataIndex: 'contactInfo.name' },
      { title: 'Email address', dataIndex: 'contactInfo.email' },
      { title: 'Phone number', dataIndex: 'contactInfo.phone' }
    ];

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />
            </div>
            <div style={{ margin: '32px 0' }} />
            {this.renderTable({ columns })}
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
