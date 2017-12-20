import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Uploader, BaseForm } from 'modules/common/components';
import { days, dateTimeFormat } from 'modules/common/constants';
import AddMore from 'modules/companies/components/list/AddMore';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class MainInfo extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState });
  }

  render() {
    const { editorState } = this.state;
    const { data, location } = this.props;
    const { companies } = location.state || {};

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

    const companiesTags = companies.map((el, i) => (
      <Tag key={i}>{el.basicInfo.enName}</Tag>
    ));

    return (
      <div>
        <label>Sending RFQ to: </label>
        {companiesTags}

        <AddMore withTag={true} />
        <p style={{ paddingBottom: '16px' }} />

        {this.renderField({
          layout: layout,
          name: 'tenderNumber',
          optional: true,
          control: <Input placeholder="Tender number" />
        })}
        {this.renderField({
          layout: layout,
          name: 'tenderName',
          optional: true,
          control: <Input placeholder="Tender name" />
        })}
        {this.renderField({
          layout: layout,
          name: 'date',
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
        {this.renderField({
          layout: layout,
          name: 'reminderDay',
          optional: true,
          control: (
            <Select placeholder="Expired day reminder">
              {this.renderOptions(days)}
            </Select>
          )
        })}
        {this.renderField({
          layout: layout,
          name: 'file',
          dataType: 'file',
          control: (
            <Uploader
              initialFile={data.file}
              onReceiveFile={(...args) => this.fileUpload(...args)}
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

MainInfo.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object
};

const MainInfoForm = Form.create()(MainInfo);

export default MainInfoForm;
