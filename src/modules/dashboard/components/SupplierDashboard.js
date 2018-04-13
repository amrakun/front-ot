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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.getPrequalifiedStatus = this.getPrequalifiedStatus.bind(this);
  }

  getPrequalifiedStatus() {
    const { prequalifiedStatus } = this.props.data;
    const { __ } = this.context;
    const {
      isApproved,
      isExpired,
      isFailed,
      isOutstanding
    } = prequalifiedStatus;

    if (isApproved) return __('Approved');

    if (isExpired) return __('Expired');

    if (isFailed)
      return (
        <span>
          {__('You are not pre-qualified, please click')}{' '}
          <Link to="/prequalification">{__('here')}</Link>{' '}
          {__('to update your information')}
        </span>
      );

    if (isOutstanding) return 'Outstanding';

    return __('Not complete');
  }

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
    const { __ } = this.context;

    let hasNewAudit = false;
    audits.forEach(audit => {
      if (audit.supplierResponse === null) hasNewAudit = true;
    });

    const hasFeedback = lastFeedback && !lastFeedback.supplierResponse;

    return (
      <div>
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
            <NumberCardLines
              icon="calendar"
              title={__('DIFOT Score')}
              tooltip={
                averageDifotScore < 75 ? __(labels.difotSuggestion) : null
              }
              color={averageDifotScore ? colors[7] : colors[5]}
              number={averageDifotScore ? averageDifotScore.toFixed(1) : 0}
              percent={averageDifotScore ? averageDifotScore.toFixed(1) : 0}
              withPercent={true}
            />
          </Col>
          <Col key={5} lg={8} sm={12}>
            <TextCard
              icon="mail"
              title={__('Success feedback')}
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
              badge={lastFeedback !== null && !lastFeedback.supplierResponse}
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
                    <Icon type="warning" style={{ color: 'f15a24' }} />
                  )}
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
            <TextCard
              icon="calculator"
              title={__('Qualification/audit')}
              color={hasNewAudit ? colors[7] : colors[5]}
              text={
                hasNewAudit ? (
                  <span>
                    {__('You have new audit invitation. Click')}{' '}
                    <Link to="qualification">{__('here')}</Link>{' '}
                    {__('view your audit invitations')}
                  </span>
                ) : (
                  __('Nothing new')
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
  __: PropTypes.func
};

export default Dashboard;
