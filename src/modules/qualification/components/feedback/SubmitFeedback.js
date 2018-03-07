/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Tabs, Input, Form, Alert } from 'antd';
import { Editor } from 'modules/common/components';
import { PropTypes } from 'prop-types';
import { BaseForm } from 'modules/common/components';
import { labels, titles } from './constants';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFeedbackContentChange(content) {
    this.setState({ feedbackContent: content });
  }

  render() {
    const { feedbackContent } = this.state;
    const { forSubmit } = this.props;
    const data = this.props.data || {};
    const { __ } = this.context;

    return (
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
            <Card title={__(titles.changes.title)}>
              <p>{__(titles.changes.description)}</p>
              {this.renderField({
                label: labels.employmentNumberBefore,
                name: 'employmentNumberBefore',
                control: <Input type="number" />
              })}
              {this.renderField({
                label: labels.employmentNumberNow,
                name: 'employmentNumberNow',
                control: <Input type="number" />
              })}
            </Card>
            <Card title={__(titles.spend.title)} className="margin">
              <p>{__(titles.spend.description)}</p>
              {this.renderField({
                label: labels.nationalSpendBefore,
                name: 'nationalSpendBefore',
                control: <Input type="number" />
              })}
              {this.renderField({
                label: labels.nationalSpendAfter,
                name: 'nationalSpendAfter',
                control: <Input type="number" />
              })}
              {this.renderField({
                label: labels.umnugobiSpendBefore,
                name: 'umnugobiSpendBefore',
                control: <Input type="number" />
              })}
              {this.renderField({
                label: labels.umnugobiSpendAfter,
                name: 'umnugobiSpendAfter',
                control: <Input type="number" />
              })}
            </Card>

            <Card className="margin">
              {this.renderField({
                label: labels.investment,
                name: 'investment',
                control: <TextArea style={{ height: '80px' }} />
              })}
              {this.renderField({
                label: labels.trainings,
                name: 'trainings',
                control: <TextArea style={{ height: '80px' }} />
              })}
              {this.renderField({
                label: labels.corporateSocial,
                name: 'corporateSocial',
                control: <TextArea style={{ height: '80px' }} />
              })}
              {this.renderField({
                label: labels.technologyImprovement,
                name: 'technologyImprovement',
                control: <TextArea style={{ height: '80px' }} />
              })}
            </Card>
            {this.renderSubmit('Submit')}
          </Form>
        </TabPane>
      </Tabs>
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
