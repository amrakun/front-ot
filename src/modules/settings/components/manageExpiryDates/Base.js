import React from 'react';
import { withRouter } from 'react-router';
import { PreQualification, QualificationAudit } from '../../containers/';

import { Card, Row, Col, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class ManageExpiryDates extends React.Component {
  render() {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Templates">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Pre-qualification" key="1">
                <PreQualification />
              </TabPane>
              <TabPane tab="Desktop qualificaion/audit" key="2">
                <QualificationAudit />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(ManageExpiryDates);
