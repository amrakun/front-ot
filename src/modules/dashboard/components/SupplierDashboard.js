/*eslint-disable max-len */

import React from 'react';
import { SupplierTenders } from '../../tenders/containers';
import { PropTypes } from 'prop-types';
import queryString from 'query-string';
import {
  NumberCard,
  NumberCardLines,
  TextCard
} from 'modules/common/components';
import { colors } from 'modules/common/constants';
import { Row, Col, Alert, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { labels } from '../constants';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  dashboardOpenRfqAndEoi: {
    id: 'dashboardOpenRfqAndEoi',
    defaultMessage: 'Open EOI/RFQ'
  },
  dashboardOpenRfqAndEoiDescription: {
    id: 'dashboardOpenRfqAndEoiDescription',
    defaultMessage: 'Expression Of Interest (EOI), Request for quotation (RFQ)'
  },
  dashboardDifotScore: {
    id: 'dashboardDifotScore',
    defaultMessage: 'DIFOT Score'
  },
  dashboardSuccessFeedback: {
    id: 'dashboardSuccessFeedback',
    defaultMessage: 'Success feedback'
  },
  dashboardReminder: {
    id: 'dashboardReminder',
    defaultMessage: 'Reminder'
  },
  dashboardPrequalification: {
    id: 'dashboardPrequalification',
    defaultMessage: 'Pre-Qualification status'
  },
  dashboardQualification: {
    id: 'dashboardQualification',
    defaultMessage: 'Qualificaiton/audit'
  }
});

class Dashboard extends React.Component {
  render() {
    const { data, history, location } = this.props;
    const {
      averageDifotScore,
      lastFeedback,
      openTendersCount,
      audits,
      isPrequalified,
      isSentRegistrationInfo
    } = data;

    const queryParams = queryString.parse(location.search);
    const currentUser = this.context.currentUser || {};
    const { formatMessage } = this.context;

    let hasNewAudit = false;
    audits.forEach(audit => {
      if (audit.supplierResponse === null) hasNewAudit = true;
    });

    const hasFeedback = lastFeedback && !lastFeedback.supplierResponse;

    return (
      <div>
        {!isSentRegistrationInfo && (
          <Alert
            message="Welcome!"
            description={
              <div>
                Please fill in&nbsp;
                <Link to="/registration" className="sn">
                  Registration
                </Link>
                &nbsp;form to be able to participate in tenders and EOI
              </div>
            }
            type="info"
            showIcon
            className={
              this.registrationComplete && this.prequalificationComplete
                ? 'hidden'
                : ''
            }
          />
        )}

        <div className="margin" />
        <Row gutter={24}>
          <Col key={1} lg={8} sm={12}>
            <NumberCard
              icon="message"
              title={formatMessage(messages.dashboardOpenRfqAndEoi)}
              color={openTendersCount > 0 ? colors[7] : colors[5]}
              number={openTendersCount}
              tooltip={formatMessage(
                messages.dashboardOpenRfqAndEoiDescription
              )}
            />
          </Col>
          <Col key={4} lg={8} sm={12}>
            <NumberCardLines
              icon="calendar"
              title={formatMessage(messages.dashboardDifotScore)}
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
              title={formatMessage(messages.dashboardSuccessFeedback)}
              color={hasFeedback ? colors[7] : colors[5]}
              text={
                hasFeedback ? (
                  <span>
                    <T id="dashboardFeedbackText1">
                      You have new success feedback request. Click
                    </T>{' '}
                    <Link to={`feedback/submit/${lastFeedback._id}`}>
                      <T id="clickHere">here</T>
                    </Link>{' '}
                    <T id="dashboardFeedbackText2">to submit your response.</T>
                  </span>
                ) : (
                  <T id="dashboardNothingNew">Nothing new</T>
                )
              }
              badge={lastFeedback !== null && !lastFeedback.supplierResponse}
            />
          </Col>
          <Col key={2} lg={8} sm={12}>
            <NumberCard
              icon="clock-circle-o"
              title={formatMessage(messages.dashboardReminder)}
              color={colors[5]}
              number={0}
            />
          </Col>
          <Col key={3} lg={8} sm={12}>
            <TextCard
              icon="solution"
              title={
                <span>
                  {formatMessage(messages.dashboardPrequalification)}
                  {isPrequalified === false && (
                    <Icon type="warning" style={{ color: 'f15a24' }} />
                  )}
                </span>
              }
              color={isPrequalified === null ? colors[5] : colors[7]}
              tooltip={
                isPrequalified === null
                  ? null
                  : !isPrequalified ? labels.preqSuggestion : null
              }
              text={
                <span>
                  {isPrequalified === null ? (
                    <T id="dashboardNothingNew">Nothing new</T>
                  ) : isPrequalified ? (
                    <T id="yes">Yes</T>
                  ) : (
                    <span>
                      <T id="dashboardPrequalificationText1">
                        You are not pre-qualified, please click
                      </T>{' '}
                      <Link to="/prequalification">
                        <T id="clickHere">here</T>
                      </Link>{' '}
                      <T id="dashboardPrequalificationText2">
                        to update your information
                      </T>
                    </span>
                  )}
                </span>
              }
              withPercent={true}
            />
          </Col>
          <Col key={6} lg={8} sm={12}>
            <TextCard
              icon="calculator"
              title={formatMessage(messages.dashboardQualification)}
              color={hasNewAudit ? colors[7] : colors[5]}
              text={
                hasNewAudit ? (
                  <span>
                    <T id="dashboardAuditText1">
                      You have new audit invitation. Click
                    </T>{' '}
                    <Link to="qualification">
                      <T id="clickHere">here</T>
                    </Link>{' '}
                    <T id="dashboardAuditText2">view your audit invitations</T>
                  </span>
                ) : (
                  <T id="dashboardNothingNew">Nothing new</T>
                )
              }
              badge={hasNewAudit}
            />
          </Col>
        </Row>

        <SupplierTenders
          history={history}
          location={location}
          type="eoi"
          supplierId={currentUser.companyId}
          queryParams={queryParams}
        />

        <SupplierTenders
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
  currentUser: PropTypes.object,
  formatMessage: PropTypes.func
};

export default Dashboard;
