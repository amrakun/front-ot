import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Select, Input, Button } from 'antd';
import { Editor } from '../../../common/components';

const FormItem = Form.Item;
const Option = Select.Option;

class Template extends React.Component {
  constructor(props) {
    super(props);

    const { template } = this.props;

    this.onSubmit = this.onSubmit.bind(this);

    this.state = this.generateState(template);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.template !== nextProps.template) {
      this.setState(this.generateState(nextProps.template));
    }
  }

  generateState(template) {
    return {
      editorKey: Math.random(),
      language: 'en',
      from: template.from,
      subject: template.subject ? { ...template.subject } : { mn: '', en: '' },
      content: template.content ? { ...template.content } : { mn: '', en: '' }
    };
  }

  onSubmit() {
    const { kind, parentName } = this.props;
    const { from, subject, content } = this.state;

    this.props.save({ name: parentName, kind, from, subject, content });
  }

  onChangeLanguage(language) {
    this.setState({ language, editorKey: Math.random() });
  }

  onChangeFrom(e) {
    this.setState({ from: e.target.value });
  }

  onChangeSubject(e) {
    const { language, subject } = this.state;

    subject[language] = e.target.value;

    this.setState({ subject });
  }

  onChangeContent(value) {
    const { language, content } = this.state;

    content[language] = value;

    this.setState({ content });
  }

  render() {
    const { editorKey, language, from, subject, content } = this.state;

    return (
      <div>
        <FormItem label="Email from">
          <Input value={from} onChange={e => this.onChangeFrom(e)} />
        </FormItem>

        <FormItem label="Language">
          <Select
            value={language}
            style={{ width: '100%' }}
            onChange={value => this.onChangeLanguage(value)}
          >
            <Option value="mn">Mongolia</Option>
            <Option value="en">English</Option>
          </Select>
        </FormItem>

        <FormItem label="Email subject">
          <Input
            value={subject[language]}
            onChange={e => this.onChangeSubject(e)}
          />
        </FormItem>

        <FormItem label="Email content">
          <Editor
            key={editorKey}
            content={content[language]}
            onEmailContentChange={value => this.onChangeContent(value)}
          />
        </FormItem>

        <Col span={24}>
          <Button
            type="primary"
            style={{ float: 'right', marginTop: 20 }}
            onClick={this.onSubmit}
          >
            Save
          </Button>
        </Col>
      </div>
    );
  }
}

Template.propTypes = {
  parentName: PropTypes.string,
  kind: PropTypes.string,
  save: PropTypes.func,
  template: PropTypes.object
};

export default Template;
