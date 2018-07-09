/*eslint-disable max-len */

import React from 'react';
import { PropTypes } from 'prop-types';
import queryString from 'query-string';
import { Row, Col, Alert, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { HelpModal, NumberCard, TextCard } from 'modules/common/components';
import { colors } from 'modules/common/constants';
import { SupplierTenders } from '../../tenders/containers';
import { labels } from '../constants';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.getPrequalifiedStatus = this.getPrequalifiedStatus.bind(this);
  }

  getPrequalifiedStatus() {
    const { data, exportPreq } = this.props;
    const { prequalifiedStatus } = data;
    const { __ } = this.context;
    const {
      isApproved,
      isExpired,
      isFailed,
      isOutstanding
    } = prequalifiedStatus;

    if (isApproved) {
      return <a onClick={exportPreq}>{__('Pre-qualified')}</a>;
    }

    if (isExpired) {
      return <a onClick={exportPreq}>{__('Expired')}</a>;
    }

    if (isOutstanding) {
      return <a onClick={exportPreq}>{__('In progress')}</a>;
    }

    if (isFailed)
      return (
        <span>
          {__('You are not pre-qualified, please click')}{' '}
          <Link to="/prequalification">{__('here')}</Link>{' '}
          {__('to update your information')}
        </span>
      );

    return <a onClick={exportPreq}>{__('Not complete')}</a>;
  }

  renderAuditNotification() {
    const { auditImprovementPlanNotification, hasNewAudit } =
      this.props.data || {};

    const { __ } = this.context;

    let text = __('Nothing new');
    let color = colors[5];
    let badge = false;

    if (hasNewAudit) {
      text = (
        <span>
          {__('You have new audit invitation. Click')}{' '}
          <Link to="qualification">{__('here')}</Link>{' '}
          {__('view your audit invitations')}
        </span>
      );

      color = colors[7];
      badge = true;
    }

    if (auditImprovementPlanNotification) {
      const _id = auditImprovementPlanNotification.auditId;

      text = (
        <span>
          {__('You have new audit improvement plan. Click')}{' '}
          <Link to={`/audit/submit/${_id}`}>{__('here')}</Link>{' '}
          {__('view your audit')}
        </span>
      );

      color = colors[7];
      badge = true;
    }

    return (
      <TextCard
        icon="calculator"
        title={
          <span>
            {__('Qualification/audit')} <HelpModal videoId="audit" />
          </span>
        }
        color={color}
        text={text}
        badge={badge}
      />
    );
  }

  render() {
    const { data, history, location } = this.props;

    const {
      averageDifotScore,
      lastFeedback,
      openTendersCount,
      isPrequalified,
      isSentRegistrationInfo
    } = data;

    const queryParams = queryString.parse(location.search);
    const currentUser = this.context.currentUser || {};
    const { __ } = this.context;

    const hasFeedback = lastFeedback && !lastFeedback.supplierResponse;

    return (
      <div>
        <HelpModal videoId="dashboard" />

        {!isSentRegistrationInfo && (
          <Alert
            message={__('Welcome!')}
            description={
              <div>
                {__('Please fill in')}{' '}
                <Link to="/registration" className="sn">
                  {__('Registration')}{' '}
                </Link>
                {__('form to be able to participate in tenders and EOI')}
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
              title={__('Open EOI/RFQ')}
              color={openTendersCount > 0 ? colors[7] : colors[5]}
              number={openTendersCount}
              tooltip={__(
                'Express of Interest (EOI), Request for quotation (RFQ)'
              )}
            />
          </Col>
          <Col key={4} lg={8} sm={12}>
            <NumberCard
              icon="calendar"
              title={__('DIFOT Score')}
              tooltip={
                averageDifotScore < 75 ? __(labels.difotSuggestion) : null
              }
              color={averageDifotScore ? colors[7] : colors[5]}
              number={averageDifotScore || 0}
            />
          </Col>
          <Col key={5} lg={8} sm={12}>
            <TextCard
              icon="mail"
              title={
                <span>
                  {__('Success feedback')}{' '}
                  <HelpModal videoId="successFeedback" />
                </span>
              }
              color={hasFeedback ? colors[7] : colors[5]}
              text={
                hasFeedback ? (
                  <span>
                    {__('Please click')}
                    <Link to={`feedback/submit/${lastFeedback._id}`}>
                      {' '}
                      {__('here')}
                    </Link>{' '}
                    {__('to share your successes!')}
                  </span>
                ) : (
                  __('Nothing new')
                )
              }
              badge={lastFeedback && !lastFeedback.supplierResponse}
            />
          </Col>
          <Col key={2} lg={8} sm={12}>
            <NumberCard
              icon="clock-circle-o"
              title={__('Reminder')}
              color={colors[5]}
              number={0}
            />
          </Col>
          <Col key={3} lg={8} sm={12}>
            <TextCard
              icon="solution"
              title={
                <span>
                  {__('Pre-Qualification status')}
                  {isPrequalified === false && (
                    <span>
                      {' '}
                      <Icon type="warning" style={{ color: 'f15a24' }} />
                    </span>
                  )}{' '}
                  <HelpModal videoId="prequalification" />
                </span>
              }
              color={isPrequalified === null ? colors[5] : colors[7]}
              tooltip={
                isPrequalified === null
                  ? null
                  : !isPrequalified ? __(labels.preqSuggestion) : null
              }
              text={this.getPrequalifiedStatus()}
              withPercent={true}
            />
          </Col>
          <Col key={6} lg={8} sm={12}>
            {this.renderAuditNotification()}
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
  location: PropTypes.object,
  exportPreq: PropTypes.func
};

Dashboard.contextTypes = {
  currentUser: PropTypes.object,
  __: PropTypes.func
};

export default Dashboard;
