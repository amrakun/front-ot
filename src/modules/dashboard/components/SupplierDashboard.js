/*eslint-disable max-len */

import React from 'react';
import { Tenders } from '../../tenders/containers';
import { PropTypes } from 'prop-types';
import queryString from 'query-string';
import {
  NumberCard,
  NumberCardLines,
  TextCard
} from 'modules/common/components';
import { colors } from 'modules/common/colors';
import { Row, Col, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { labels } from '../constants';

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
    const { data, history, location } = this.props;
    const {
      averageDifotScore,
      lastFeedback,
      openTendersCount,
      audits,
      isPrequalified
    } = data;

    const queryParams = queryString.parse(location.search);
    const currentUser = this.context.currentUser || {};

    const lastAudit = audits[0];

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
          <Col key={1} lg={8} sm={12}>
            <NumberCard
              icon="message"
              title="Open EOI/RFQ"
              color={colors[7]}
              number={openTendersCount}
            />
          </Col>
          <Col key={4} lg={8} sm={12}>
            <NumberCardLines
              icon="calendar"
              title="DIFOT score"
              tooltip={averageDifotScore < 75 ? labels.difotSuggestion : null}
              color={averageDifotScore ? colors[7] : colors[5]}
              number={averageDifotScore || 0}
              percent={averageDifotScore || 0}
              withPercent={true}
            />
          </Col>
          <Col key={5} lg={8} sm={12}>
            <TextCard
              icon="mail"
              title="Success feedback"
              color={colors[7]}
              text={
                lastFeedback && !lastFeedback.supplierResponse ? (
                  <span>
                    You have new success feedback request. Click&nbsp;
                    <Link to={`feedback/submit/${lastFeedback._id}`}>here</Link>
                    &nbsp;to submit ypir response.
                  </span>
                ) : (
                  <span>Nothing new</span>
                )
              }
              badge={lastFeedback !== null && !lastFeedback.supplierResponse}
            />
          </Col>
          <Col key={2} lg={8} sm={12}>
            <NumberCard
              icon="clock-circle-o"
              title="Reminder"
              color={colors[5]}
              number={0}
            />
          </Col>
          <Col key={3} lg={8} sm={12}>
            <TextCard
              icon="solution"
              title="Pre-qualification status"
              color={isPrequalified ? colors[7] : colors[5]}
              tooltip={isPrequalified ? null : labels.preqSuggestion}
              text={<span>{isPrequalified ? 'Yes' : 'No'}</span>}
              withPercent={true}
            />
          </Col>
          <Col key={6} lg={8} sm={12}>
            <TextCard
              icon="calculator"
              title="Qualification/audit"
              color={colors[7]}
              text={
                lastAudit ? (
                  <span>
                    You have new audit invitation. Click&nbsp;
                    <Link to="qualification">here</Link>
                    &nbsp;view your audit invitations
                  </span>
                ) : (
                  <span>Nothing new</span>
                )
              }
              badge={lastAudit !== undefined}
            />
          </Col>
        </Row>

        <Tenders
          history={history}
          location={location}
          type="eoi"
          supplierId={currentUser.companyId}
          queryParams={queryParams}
        />

        <Tenders
          history={history}
          location={location}
          type="rfq"
          supplierId={currentUser.companyId}
          queryParams={queryParams}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

Dashboard.contextTypes = {
  currentUser: PropTypes.object
};

export default Dashboard;
