import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Row, Col, Tabs, Button } from 'antd';
import { Editor } from '../../../common/components';
const TabPane = Tabs.TabPane;

const propTypes = {
  onEmailContentChange: PropTypes.func,
  configsSaveTemplate: PropTypes.func
};

class Templates extends React.Component {
  constructor(props, context) {
    super(props);

    const { systemConfig } = context;

    this.state = {
      EditorContent: systemConfig.eoiTemplate || '',
      currentTab: 'eoiTemplate',
      eoiTemplate: systemConfig.eoiTemplate || '',
      rfqTemplate: systemConfig.rfqTemplate || '',
      regretLetterTemplate: systemConfig.regretLetterTemplate || '',
      successFeedbackTemplate: systemConfig.successFeedbackTemplate || '',
      auditTemplate: systemConfig.auditTemplate || ''
    };

    this.saveEditor = this.saveEditor.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(e) {
    this.setState({ currentTab: e, EditorContent: this.state[e] });
  }

  handleEditorChange(content) {
    const { currentTab } = this.state;

    this.setState({
      [currentTab]: content,
      EditorContent: content
    });
  }

  saveEditor(name) {
    const { EditorContent } = this.state;
    this.props.configsSaveTemplate(name, EditorContent);
  }

  renderEditor(name) {
    const { EditorContent } = this.state;

    return (
      <div>
        <Editor
          content={EditorContent}
          onEmailContentChange={this.handleEditorChange}
        />
        <Button
          type="primary"
          onClick={this.saveEditor.bind(this, name)}
          style={{ float: 'right', marginTop: 20 }}
        >
          Save
        </Button>
      </div>
    );
  }

  componentDidUpdate() {}

  render() {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Templates">
            <Tabs
              defaultActiveKey="eoiTemplate"
              onChange={this.handleTabChange}
            >
              <TabPane tab="EOI" key="eoiTemplate">
                {this.renderEditor('eoiTemplate')}
              </TabPane>
              <TabPane tab="RFQ" key="rfqTemplate">
                {this.renderEditor('rfqTemplate')}
              </TabPane>
              <TabPane tab="Regret Letter" key="regretLetterTemplate">
                {this.renderEditor('regretLetterTemplate')}
              </TabPane>
              <TabPane tab="Success feedback" key="successFeedbackTemplate">
                {this.renderEditor('successFeedbackTemplate')}
              </TabPane>
              <TabPane tab="Qualification/Audit" key="auditTemplate">
                {this.renderEditor('auditTemplate')}
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
}

Templates.propTypes = propTypes;

Templates.contextTypes = {
  systemConfig: PropTypes.object
};

export default withRouter(Templates);
