import React from 'react';
import { Tag, Input, Select, DatePicker } from 'antd';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types';
import moment from 'moment';
import { dateTimeFormat } from '../../../common/constants';
import AddMore from '../../../companies/components/list/AddMore';
import { days } from '../../constants';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Uploader } from 'modules/common/components';

const { RangePicker } = DatePicker;

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

const propTypes = {
  companies: PropTypes.array,
  renderField: PropTypes.func,
  renderOptions: PropTypes.func,
  onEmailHtmlEdit: PropTypes.func,
  emailHtml: PropTypes.string
};

class Email extends React.Component {
  constructor(props) {
    super(props);

    const { contentBlocks, entityMap } = htmlToDraft(props.emailHtml);
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);

    this.state = {
      editorState: editorState
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.props.onEmailHtmlEdit(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    this.setState({ editorState });
  }

  render() {
    const { editorState } = this.state;
    const {
      renderField,
      renderOptions,
      startDate,
      endDate,
      file,
      fileUpload
    } = this.props;

    const companiesTags = this.props.companies.map((el, i) => (
      <Tag key={i}>{el.basicInfo.enName}</Tag>
    ));

    return (
      <div>
        <label>Sending RFQ to: </label>
        {companiesTags}

        <AddMore withTag={true} />
        <p style={{ paddingBottom: '16px' }} />

        {renderField({
          layout: layout,
          name: 'tenderNumber',
          optional: true,
          control: <Input placeholder="Tender number" />
        })}
        {renderField({
          layout: layout,
          name: 'tenderName',
          optional: true,
          control: <Input placeholder="Tender name" />
        })}
        {renderField({
          layout: layout,
          name: 'date',
          optional: true,
          initialValue: [moment(startDate), moment(endDate)],
          control: (
            <RangePicker
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
            <Uploader
              initialFile={file}
              onReceiveFile={(...args) => fileUpload(...args)}
            />
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

Email.propTypes = propTypes;

export default Email;
