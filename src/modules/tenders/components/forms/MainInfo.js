import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, DatePicker, Tag } from 'antd';
import moment from 'moment';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { Uploader } from 'modules/common/components';
import { days, dateTimeFormat } from 'modules/common/constants';
import AddMore from 'modules/companies/components/list/AddMore';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class MainInfo extends React.Component {
  constructor(props) {
    super(props);

    const { contentBlocks, entityMap } = htmlToDraft(props.content);
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );

    this.state = {
      editorState: EditorState.createWithContent(contentState)
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState });
    this.props.onEmailContentChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  }

  render() {
    const { editorState } = this.state;

    const {
      renderField,
      renderOptions,
      onReceiveFile,
      data,
      supplierIds
    } = this.props;

    const dateRange = data.publishDate
      ? [moment(data.publishDate), moment(data.closeDate)]
      : null;

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

    const supplierTags = supplierIds.map(el => <Tag key={el}>{el}</Tag>);

    return (
      <div>
        <label>Sending RFQ to: </label>
        {supplierTags}
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
          initialValue: dateRange,
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
  data: PropTypes.object,
  content: PropTypes.string,
  supplierIds: PropTypes.array
};

export default MainInfo;
