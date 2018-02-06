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
import { Row, Col, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { labels } from '../constants';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  dashboardOpenRfqAndEoi: {
    id: 'dashboardOpenRfqAndEoi',
    defaultMessage: 'Open EOI/RFQ'
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
      isSentPrequalificationInfo,
      isSentRegistrationInfo
    } = data;

    const queryParams = queryString.parse(location.search);
    const currentUser = this.context.currentUser || {};
    const { formatMessage } = this.context;

    let hasNewAudit = false;
    audits.forEach(audit => {
      if (audit.supplierResponse === null) hasNewAudit = true;
    });

    return (
      <div>
        {!isSentRegistrationInfo || !isSentPrequalificationInfo ? (
          <Alert
            message="Welcome!"
            description={
              <div>
                Please fill in&nbsp;
                {!isSentRegistrationInfo && (
                  <Link to="/registration" className="sn">
                    Registration{' '}
                  </Link>
                )}
                &nbsp;
                {!isSentPrequalificationInfo && (
                  <Link to="prequalification" className="sn">
                    Pre-qualification
                  </Link>
                )}
                &nbsp;forms to be able to participate in tenders and EOI
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
        ) : (
          ''
        )}

        <div className="margin" />
        <Row gutter={24}>
          <Col key={1} lg={8} sm={12}>
            <NumberCard
              icon="message"
              title={formatMessage(messages.dashboardOpenRfqAndEoi)}
              color={colors[7]}
              number={openTendersCount}
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
              color={colors[7]}
              text={
                lastFeedback && !lastFeedback.supplierResponse ? (
                  <span>
                    You have new success feedback request. Click&nbsp;
                    <Link to={`feedback/submit/${lastFeedback._id}`}>here</Link>
                    &nbsp;to submit your response.
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
              title="Reminder"
              color={colors[5]}
              number={0}
            />
          </Col>
          <Col key={3} lg={8} sm={12}>
            <TextCard
              icon="solution"
              title={formatMessage(messages.dashboardPrequalification)}
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
                hasNewAudit ? (
                  <span>
                    You have new audit invitation. Click&nbsp;
                    <Link to="qualification">here</Link>
                    &nbsp;view your audit invitations
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
