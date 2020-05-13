import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Row, Col, Tabs } from 'antd';
import Templates from './Templates';

const propTypes = {
  onEmailContentChange: PropTypes.func,
  configsSaveTemplate: PropTypes.func,
};

const TabPane = Tabs.TabPane;

class ManageTemplates extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentTab: 'rfq' };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(e) {
    this.setState({ currentTab: e });
  }

  renderTabPane({ tab, key, kindOptions }) {
    return (
      <TabPane tab={tab} key={key}>
        <Templates name={key} kindOptions={kindOptions} />
      </TabPane>
    );
  }

  rfqKindOptions() {
    return [
      { value: 'buyer__publish', text: 'To buyer when publish' },
      {
        value: 'supplier__publish',
        text: 'To supplier when publish',
      },
      { value: 'buyer__close', text: 'To buyer when close' },
      { value: 'supplier__close', text: 'To supplier when close' },
      { value: 'buyer__cancel', text: 'To buyer when cancel' },
      {
        value: 'supplier__cancel',
        text: 'To supplier when cancel',
      },
      { value: 'buyer__award', text: 'To buyer when award' },
      { value: 'supplier__award', text: 'To supplier when award' },
      { value: 'supplier__reminder', text: 'Remind supplier' },
      { value: 'supplier__regretLetter', text: 'Regret letter' },
      { value: 'supplier__reopen', text: 'Reopen' },
      { value: 'supplier__edit', text: 'Edit' },
      { value: 'supplier__message_notification', text: 'Supplier message notification' },
      { value: 'buyer__message_notification', text: 'Buyer message notification' },
    ];
  }

  render() {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Card title="ManageTemplates">
            <Tabs defaultActiveKey="rfq" onChange={this.handleTabChange}>
              {this.renderTabPane({
                tab: 'RFQ',
                key: 'rfq',
                kindOptions: this.rfqKindOptions(),
              })}
              {this.renderTabPane({
                tab: 'Travel RFQ',
                key: 'trfq',
                kindOptions: this.rfqKindOptions(),
              })}
              {this.renderTabPane({
                tab: 'EOI',
                key: 'eoi',
                kindOptions: [
                  { value: 'buyer__publish', text: 'To buyer when publish' },
                  {
                    value: 'supplier__publish',
                    text: 'To supplier when publish',
                  },
                  { value: 'buyer__close', text: 'To buyer when close' },
                  { value: 'supplier__close', text: 'To supplier when close' },
                  { value: 'buyer__cancel', text: 'To buyer when cancel' },
                  {
                    value: 'supplier__cancel',
                    text: 'To supplier when cancel',
                  },
                  { value: 'supplier__reminder', text: 'Remind supplier' },
                  { value: 'supplier__regretLetter', text: 'Regret letter' },
                  { value: 'supplier__reopen', text: 'Reopen' },
                  { value: 'supplier__edit', text: 'Edit' },
                  {
                    value: 'supplier__message_notification',
                    text: 'Supplier message notification',
                  },
                  { value: 'buyer__message_notification', text: 'Buyer message notification' },
                ],
              })}
              {this.renderTabPane({
                tab: 'Success feedback',
                key: 'successFeedback',
                kindOptions: [
                  { value: 'buyer__new', text: 'Buyer' },
                  { value: 'supplier__new', text: 'Supplier' },
                ],
              })}
              {this.renderTabPane({
                tab: 'Capacity building',
                key: 'capacityBuilding',
                kindOptions: [
                  {
                    value: 'supplier__submit',
                    text: 'To supplier when submit',
                  },
                  { value: 'buyer__submit', text: 'To buyer when submit' },
                  { value: 'supplier__enable', text: 'To supplier when enable' },
                ],
              })}
              {this.renderTabPane({
                tab: 'Block',
                key: 'block',
                kindOptions: [
                  { value: 'buyer__block', text: 'Block' },
                  { value: 'buyer__reminder', text: 'Reminder' },
                ],
              })}
              {this.renderTabPane({
                tab: 'Prequalification',
                key: 'prequalification',
                kindOptions: [
                  { value: 'supplier__qualified', text: 'Approved' },
                  { value: 'supplier__failed', text: 'Failed' },
                  {
                    value: 'supplier__submit',
                    text: 'To supplier when submit',
                  },
                  { value: 'buyer__submit', text: 'To buyer When submit' },
                ],
              })}
              {this.renderTabPane({
                tab: 'Desktop audit',
                key: 'desktopAudit',
                kindOptions: [
                  {
                    value: 'supplier__invitation',
                    text: 'To supplier when receive invitation',
                  },
                  {
                    value: 'buyer__invitation',
                    text: 'To buyer when receive invitation',
                  },
                  {
                    value: 'supplier__approved',
                    text: 'To supplier when Qualified',
                  },
                  {
                    value: 'buyer__approved',
                    text: 'To auditor when Qualified',
                  },
                  {
                    value: 'supplier__failed',
                    text: 'To supplier when Not-qualified with Improvement plan',
                  },
                  {
                    value: 'buyer__failed',
                    text: 'To auditor when Not-qualified with Improvement plan',
                  },
                  {
                    value: 'supplier__enable',
                    text: 'To supplier when resubmission request enabled by OT',
                  },
                  {
                    value: 'supplier__send_resubmission_request',
                    text: 'To auditor when supplier send resubmission request',
                  },
                  { value: 'buyer__cancel', text: 'To auditor when invitation canceled' },
                  {
                    value: 'supplier__cancel',
                    text: 'To supplier when cancel',
                  },
                  {
                    value: 'supplier__due_closeDate',
                    text: 'To supplier when the due close date',
                  },
                  {
                    value: 'supplier__due_reassessmentDate',
                    text: 'To supplier when due re-assessment date',
                  },
                  {
                    value: 'supplier__close',
                    text: 'To supplier when due close date',
                  },
                  {
                    value: 'buyer__close',
                    text: 'To auditor when due close date',
                  },
                ],
              })}
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
}

ManageTemplates.propTypes = propTypes;

export default withRouter(ManageTemplates);
