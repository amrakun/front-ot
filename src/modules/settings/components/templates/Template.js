import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Select, Input, Button } from 'antd';
import { EditorCK } from '../../../common/components';

const FormItem = Form.Item;
const Option = Select.Option;

class Template extends React.Component {
  constructor(props) {
    super(props);

    const { template } = this.props;

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);

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
      content: template.content ? { ...template.content } : { mn: '', en: '' },
    };
  }

  onSubmit() {
    this.props.onSubmit(this.state);
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

  onChangeContent(e) {
    const { language, content } = this.state;

    content[language] = e.editor.getData();

    this.setState({ content });
  }

  render() {
    const { buttonText } = this.props;
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
          <Input value={subject[language]} onChange={e => this.onChangeSubject(e)} />
        </FormItem>

        <FormItem label="Email content">
          <EditorCK key={editorKey} content={content[language]} onChange={this.onChangeContent} />
        </FormItem>

        <Col span={24}>
          <Button type="primary" style={{ float: 'right', marginTop: 20 }} onClick={this.onSubmit}>
            {buttonText || 'Save'}
          </Button>
        </Col>
      </div>
    );
  }
}

Template.propTypes = {
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  template: PropTypes.object,
};

export default Template;
