import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  Tabs,
  Input,
  Tag,
  DatePicker,
  Form,
  Select,
  Table,
  Button
} from 'antd';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AddMore from '../../../companies/components/list/AddMore';
import { emailTemplate, days, formTableColumns } from '../../constants';
import { dateTimeFormat } from '../../../common/constants';
import BaseForm from '../../../common/components/BaseForm';

const propTypes = {
  company: PropTypes.object,
  location: PropTypes.object
};
const TabPane = Tabs.TabPane;
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

class SendRfq extends BaseForm {
  constructor(props) {
    super(props);

    //load html template and convert to draft-js
    const { contentBlocks, entityMap } = htmlToDraft(emailTemplate);
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);

    //render input for each column
    formTableColumns.map(
      el =>
        (el.render = (text, record) => (
          <Input
            placeholder={el.title}
            id={el.dataIndex}
            onChange={e => this.onChange(e, record)}
          />
        ))
    );
    this.formTableColumns = formTableColumns;

    this.state = {
      editorState: editorState,
      tableRows: [{ key: 0 }],
      tableValues: []
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.addRow = this.addRow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { companies } = this.props.location.state;
        const { tableRows, editorState } = this.state;
        const updatedValues = {
          ...values,
          form: tableRows,
          companies: companies,
          emailHtml: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        };
        this.props.save('SendRfq', updatedValues);
      }
    });
  }

  onChange(e, record) {
    const { tableRows } = this.state;
    tableRows[record.key][e.target.id] = e.target.value;
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState });
  }

  addRow() {
    let { tableRows } = this.state;
    tableRows.push({ key: tableRows.length });
    this.setState({ tableRows });
  }

  render() {
    const { companies } = this.props.location.state;
    const { editorState, tableRows } = this.state;

    const companiesTags = companies.map((el, i) => (
      <Tag key={i}>{el.basicInfo.enName}</Tag>
    ));

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <TabPane tab="Publish RFQ" key="1">
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
                control: (
                  <RangePicker
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
              <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
            </TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addRow}>Add row</Button>
              <Table
                className="margin form-table"
                columns={this.formTableColumns}
                dataSource={tableRows}
                pagination={false}
                size="middle"
                scroll={{ x: 3000 }}
              />
              <Button type="primary" htmlType="submit" className="margin">
                Save & continue
              </Button>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    );
  }
}

SendRfq.propTypes = propTypes;

const SendRfqForm = Form.create()(SendRfq);

export default withRouter(SendRfqForm);
