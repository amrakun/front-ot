import React from 'react';
import { Tenders } from '../../tenders/containers';
import { PropTypes } from 'prop-types';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/colors';
import { Row, Col, Alert } from 'antd';
import { Link } from 'react-router-dom';

const Dashboard = (props, context) => {
  const currentUser = context.currentUser || {};
  const { data } = props;

  let registrationComplete = true;
  let prequalificationComplete = true;

  delete data.__typename;
  delete data._id;
  Object.keys(data).forEach(function(key, index) {
    index < 8
      ? data[key] === null ? (registrationComplete = false) : ''
      : data[key] === null ? (prequalificationComplete = false) : '';
  });

  return (
    <div>
      {!registrationComplete && !prequalificationComplete ? (
        <Alert
          message="Welcome!"
          description={
            <div>
              Please fill in &#34;
              <Link
                className={registrationComplete ? 'hidden' : ''}
                to="/registration"
              >
                Supplier registration
              </Link>
              &#34; and &#34;
              <Link
                className={prequalificationComplete ? 'hidden' : ''}
                to="prequalification"
              >
                Pre-qualification
              </Link>
              &#34; forms to be able to participate in tenders and EOI
            </div>
          }
          type="success"
          showIcon
          className={
            registrationComplete && prequalificationComplete ? 'hidden' : ''
          }
        />
      ) : (
        ''
      )}

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

Dashboard.propTypes = {
  data: PropTypes.object
};

Dashboard.contextTypes = {
  currentUser: PropTypes.object
};

export default Dashboard;
