/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Row, Col, Button } from 'antd';
import { Common, Sidebar } from 'modules/companies/components';
import { Search } from 'modules/common/components';

class Requests extends Common {
  render() {
    const { toggleState, totalCount } = this.props;

    const columns = this.getWrappedColumns(
      [
        {
          key: 'isQualified',
          title: 'Is qualified',
          dataIndex: 'qualificationStatusDisplay',
        },
      ],
      [
        {
          key: 'actions',
          title: 'Actions',
          render: record => {
            const onClick = () => toggleState(record._id);

            const { isEditable, showToggleButton } = record.qualificationState;

            if (!showToggleButton) {
              return;
            }

            if (isEditable) {
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
          },
        },
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

export default withRouter(Requests);
