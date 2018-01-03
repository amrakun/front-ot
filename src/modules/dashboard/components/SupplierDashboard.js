import React from 'react';
import { Tenders } from '../../tenders/containers';
import { PropTypes } from 'prop-types';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/colors';
import { Row, Col, Alert } from 'antd';
import { Link } from 'react-router-dom';

const Dashboard = (props, context) => {
  const currentUser = context.currentUser || {};

  return (
    <div>
      <Alert
        message="Welcome!"
        description={
          <div>
            Please fill in <Link to="/registration">Supplier registration</Link>{' '}
            and <Link to="prequalification">Pre-qualification</Link> forms to be
            able to participate in tenders and EOI
          </div>
        }
        type="success"
        showIcon
      />

      <div className="margin" />
      <Row gutter={24}>
        <Col key={1} lg={6} sm={12}>
          <NumberCard
            icon="message"
            title="Open EOI/RFQ"
            color={colors[5]}
            number={0}
          />
        </Col>
        <Col key={2} lg={6} sm={12}>
          <NumberCard
            icon="clock-circle-o"
            title="Reminder"
            color={colors[5]}
            number={0}
          />
        </Col>
        <Col key={3} lg={6} sm={12}>
          <NumberCardLines
            icon="solution"
            title="Pre-qualification status"
            color={colors[5]}
            number={0}
            percent={0}
            withPercent={true}
          />
        </Col>
        <Col key={4} lg={6} sm={12}>
          <NumberCardLines
            icon="calculator"
            title="DIFOT score"
            color={colors[5]}
            number={0}
            percent={0}
            withPercent={true}
          />
        </Col>
      </Row>
      <Tenders type="rfq" supplierId={currentUser.companyId} />
      <Tenders type="eoi" supplierId={currentUser.companyId} />
    </div>
  );
};

Dashboard.contextTypes = {
  currentUser: PropTypes.object
};

export default Dashboard;
