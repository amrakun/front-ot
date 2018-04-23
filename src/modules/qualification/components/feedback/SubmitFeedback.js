/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Tabs, Input, Form, Alert } from 'antd';
import { Editor } from 'modules/common/components';
import { PropTypes } from 'prop-types';
import { BaseForm } from 'modules/common/components';
import { labels, titles } from './constants';
import { HelpModal } from 'modules/common/components';

const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;

class SubmitFeedback extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      feedbackContent: 'You have been invited to success feedback'
    };

    this.handleFeedbackContentChange = this.handleFeedbackContentChange.bind(
      this
    );
  }

  handleFeedbackContentChange(content) {
    this.setState({ feedbackContent: content });
  }

  renderQuestion(name, input) {
    return this.renderField({
      label: labels[name],
      control:
        input === 'TextArea' ? (
          <TextArea style={{ height: '80px' }} />
        ) : (
          <Input type="number" />
        ),
      name
    });
  }

  render() {
    const { feedbackContent } = this.state;
    const data = this.props.data || {};
    const { forSubmit } = this.props;
    const { __ } = this.context;

    return (
      <div>
        <HelpModal videoId="successFeedback" />

        <Tabs tabPosition="left" className="supplier-forms">
          <TabPane tab={__('Success feedback form')} key={1}>
            {!forSubmit ? (
              <Editor
                content={feedbackContent}
                onEmailContentChange={this.handleFeedbackContentChange}
              />
            ) : (
              <Alert
                message={__('Success feedback')}
                description={
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                }
                type="info"
                closeText={__('Close now')}
              />
            )}

            <Form className="margin">
              <Card title={__(titles['1'])}>
                <p>{__(titles['1a'])}</p>
                {this.renderQuestion('totalEmploymentOt')}
                {this.renderQuestion('totalEmploymentUmnugovi')}
                {this.renderQuestion('employmentChangesAfter')}
                <p>{__(titles['1b'])}</p>
                {this.renderQuestion('numberOfEmployeeWorkToScopeNational')}
                {this.renderQuestion('numberOfEmployeeWorkToScopeUmnugovi')}
              </Card>
              <Card title={__(titles['2'])}>
                {this.renderQuestion('procurementTotalSpend')}
                {this.renderQuestion('procurementNationalSpend')}
                {this.renderQuestion('procurementUmnugoviSpend')}
              </Card>

              <Card>
                {this.renderQuestion('corporateSocial', 'TextArea')}
                {this.renderQuestion('otherStories', 'TextArea')}
              </Card>
              {this.renderSubmit('Submit')}
            </Form>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

SubmitFeedback.propTypes = {
  data: PropTypes.object,
  forSubmit: PropTypes.bool,
  form: PropTypes.object
};

SubmitFeedback.propTypes = {
  __: PropTypes.func
};

const SubmitFeedbackForm = Form.create()(SubmitFeedback);

export default withRouter(SubmitFeedbackForm);
