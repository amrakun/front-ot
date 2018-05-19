import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Row, Col, Tabs } from 'antd';
import Templates from './Templates';

const propTypes = {
  onEmailContentChange: PropTypes.func,
  configsSaveTemplate: PropTypes.func
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

  render() {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Card title="ManageTemplates">
            <Tabs defaultActiveKey="rfq" onChange={this.handleTabChange}>
              {this.renderTabPane({
                tab: 'RFQ',
                key: 'rfq',
                kindOptions: [
                  { value: 'buyer__publish', text: 'Buyer publish' },
                  { value: 'buyer__close', text: 'Buyer close' }
                ]
              })}
              {this.renderTabPane({
                tab: 'EOI',
                key: 'eoi',
                kindOptions: [
                  { value: 'buyer__publish', text: 'Buyer publish' }
                ]
              })}
              {this.renderTabPane({
                tab: 'Success feedback',
                key: 'successFeedback'
              })}
              {this.renderTabPane({
                tab: 'Capacity building',
                key: 'capacityBuilding'
              })}
              {this.renderTabPane({ tab: 'Block', key: 'block' })}
              {this.renderTabPane({
                tab: 'Prequalification',
                key: 'prequalification'
              })}
              {this.renderTabPane({
                tab: 'Desktop audit',
                key: 'desktopAuditn'
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
