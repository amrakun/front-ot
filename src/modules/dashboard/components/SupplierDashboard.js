import React from 'react';
import { Tenders } from '../../tenders/containers';
import { PropTypes } from 'prop-types';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/colors';
import { Row, Col, Alert } from 'antd';
import { Link } from 'react-router-dom';

const queryParams = { status: ['open', 'closed', 'participated'] };

class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);

    let registrationComplete = true;
    let prequalificationComplete = true;
    const { data } = this.props;
    delete data.__typename;
    delete data._id;
    Object.keys(data).forEach(function(key, index) {
      if (index < 8)
        if (data[key] === null) registrationComplete = false;
        else if (data[key] === null) prequalificationComplete = false;
    });
    this.registrationComplete = registrationComplete;
    this.prequalificationComplete = prequalificationComplete;
  }

  render() {
    const currentUser = this.context.currentUser || {};
    const { data } = this.props;
    const { lastDifotScore } = data;

    return (
      <div>
        {!this.registrationComplete && !this.prequalificationComplete ? (
          <Alert
            message="Welcome!"
            description={
              <div>
                Please fill in &#34;
                <Link
                  className={this.registrationComplete ? 'hidden' : ''}
                  to="/registration"
                >
                  Supplier registration
                </Link>
                &#34; and &#34;
                <Link
                  className={this.prequalificationComplete ? 'hidden' : ''}
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
              this.registrationComplete && this.prequalificationComplete
                ? 'hidden'
                : ''
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
              color={lastDifotScore ? colors[6] : colors[5]}
              number={lastDifotScore.amount}
              percent={lastDifotScore.amount}
              withPercent={true}
            />
          </Col>
        </Row>
        <Tenders
          type="rfq"
          supplierId={currentUser.companyId}
          queryParams={queryParams}
        />
        <Tenders
          type="eoi"
          supplierId={currentUser.companyId}
          queryParams={queryParams}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.object
};

Dashboard.contextTypes = {
  currentUser: PropTypes.object
};

export default Dashboard;
