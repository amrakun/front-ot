import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import { Template } from '../../containers';

const FormItem = Form.Item;
const Option = Select.Option;

class Templates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kind: ''
    };
  }

  onChangeKind(kind) {
    const { systemConfig } = this.context;
    const { name } = this.props;

    const templates = systemConfig[`${name}Templates`] || {};

    const currentTemplate = templates[kind] || {
      from: '',
      subject: { mn: '', en: '' },
      content: { mn: '', en: '' }
    };

    this.setState({ kind, currentTemplate });
  }

  renderContent() {
    const { name } = this.props;
    const { kind, currentTemplate } = this.state;

    if (!currentTemplate) {
      return null;
    }

    return (
      <Template
        parentName={`${name}Templates`}
        kind={kind}
        template={currentTemplate}
      />
    );
  }

  render() {
    const { kindOptions = [] } = this.props;
    const { kind } = this.state;

    return (
      <div>
        <FormItem label="Kind">
          <Select
            style={{ width: '100%' }}
            defaultValue={kind}
            onChange={v => this.onChangeKind(v)}
          >
            {kindOptions.map((option, index) => (
              <Option value={option.value} key={index}>
                {option.text}
              </Option>
            ))}
          </Select>
        </FormItem>

        {this.renderContent()}
      </div>
    );
  }
}

Templates.propTypes = {
  name: PropTypes.string,
  kindOptions: PropTypes.array
};

Templates.contextTypes = {
  systemConfig: PropTypes.object
};

export default Templates;
