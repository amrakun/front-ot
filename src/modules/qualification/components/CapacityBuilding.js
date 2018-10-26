/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Row, Col, Button } from 'antd';
import { Common, Sidebar } from 'modules/companies/components';
import { Search } from 'modules/common/components';
import { readFileUrl } from 'modules/common/utils';

class CapacityBuilding extends Common {
  render() {
    const { toggleState, totalCount } = this.props;

    const columns = this.getWrappedColumns(
      [
        {
          key: 'request',
          title: 'Request',
          dataIndex: 'certificateInfo.description'
        },
        {
          key: 'certificateFile',
          title: 'Certificate file',
          render: record => {
            const certificateInfo = record.certificateInfo || {};
            const { file } = certificateInfo;

            if (!file) {
              return '-';
            }

            return (
              <a href={readFileUrl(file.url)} target="_blank">
                {file.name}
              </a>
            );
          }
        }
      ],
      [
        {
          key: 'actions',
          title: 'Actions',
          render: record => {
            /* if (
              record.isSentPrequalificationInfo &&
              record.prequalificationStatusDisplay !== 'In process'
            ) {
            */

            const onClick = () => toggleState(record._id);

            if (record.isPrequalificationInfoEditable) {
              return (
                <Button type="danger" size="small" onClick={onClick}>
                  Disable
                </Button>
              );
            } else {
              return (
                <Button type="primary" size="small" onClick={onClick}>
                  Enable
                </Button>
              );
            }
          }
        }
      ]
    );

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={totalCount} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />
              <div style={{ clear: 'both' }} />
            </div>
            {this.renderTable({ columns })}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(CapacityBuilding);
