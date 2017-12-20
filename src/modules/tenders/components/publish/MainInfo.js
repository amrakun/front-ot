import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Uploader } from 'modules/common/components';
import { days, dateTimeFormat } from 'modules/common/constants';
import AddMore from 'modules/companies/components/list/AddMore';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class MainInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState });

    this.props.onEmailContentChange('content');
  }

  render() {
    const { editorState } = this.state;
    const { renderField, renderOptions, onReceiveFile, data } = this.props;

    const layout = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
        lg: { span: 0 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        lg: { span: 24 }
      }
    };

    return (
      <div>
        <label>Sending RFQ to: </label>

        <AddMore withTag={true} />
        <p style={{ paddingBottom: '16px' }} />

        {renderField({
          layout: layout,
          name: 'number',
          optional: true,
          control: <InputNumber placeholder="Tender number" htmlType="number" />
        })}
        {renderField({
          layout: layout,
          name: 'name',
          optional: true,
          control: <Input placeholder="Tender name" />
        })}
        {renderField({
          layout: layout,
          name: 'dateRange',
          optional: true,
          initialValue: [moment(data.startDate), moment(data.endDate)],
          control: (
            <DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format={dateTimeFormat}
              placeholder={['Start date', 'End date']}
            />
          )
        })}
        {renderField({
          layout: layout,
          name: 'reminderDay',
          optional: true,
          control: (
            <Select placeholder="Expired day reminder">
              {renderOptions(days)}
            </Select>
          )
        })}
        {renderField({
          layout: layout,
          name: 'file',
          dataType: 'file',
          control: (
            <Uploader initialFile={data.file} onReceiveFile={onReceiveFile} />
          )
        })}
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

MainInfo.propTypes = {
  renderField: PropTypes.func,
  renderOptions: PropTypes.func,
  onEmailContentChange: PropTypes.func,
  onReceiveFile: PropTypes.func,
  location: PropTypes.object,
  data: PropTypes.object
};

export default MainInfo;
