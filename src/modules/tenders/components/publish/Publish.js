import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Input, Form, Table, Button, Select } from 'antd';
import { BaseForm, Uploader } from 'modules/common/components';
import Email from './Email';
import { rfqColumns, eoiColumns, booleanData } from '../../constants';
import { newRfqPath } from '../../../common/constants';

const propTypes = {
  location: PropTypes.object,
  data: PropTypes.object
};
const TabPane = Tabs.TabPane;

class Publish extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = props;

    if (props.location.pathname === newRfqPath || data.tableRows[0].UOM) {
      //RFQ
      rfqColumns.forEach(
        (el, index) =>
          index === rfqColumns.length - 1
            ? (el.render = (text, record) => this.renderUpload(el, record))
            : (el.render = (text, record) =>
                this.renderInput(el, record, index))
      );
      this.columns = rfqColumns;
    } else {
      //EOI
      eoiColumns[1].render = (text, record) =>
        this.renderSelect(eoiColumns[1], record);
      eoiColumns[2].render = (text, record) =>
        this.renderInput(eoiColumns[2], record);
      eoiColumns[3].render = (text, record) =>
        this.renderInput(eoiColumns[3], record);
      this.columns = eoiColumns;
    }

    this.emailHtml = data.emailHtml;

    this.state = {
      tableRows: data.tableRows
    };

    this.addRow = this.addRow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { companies } = this.props.location.state || {};
    const { tableRows } = this.state;
    const { data } = this.props;

    const extra = {
      tableRows: tableRows,
      companies: data.companies ? data.companies : companies,
      emailHtml: this.emailHtml
    };
    this.save(extra);
  }

  onChange(e, record) {
    const { tableRows } = this.state;
    const value = e.target ? e.target.value : e;
    const id = e.target ? e.target.id : 'submitted';
    tableRows[record.key][id] = value;
  }

  onFileUpload(args, record, id) {
    const { tableRows } = this.state;
    tableRows[record.key][id] = args;
  }

  addRow() {
    let { tableRows } = this.state;
    tableRows.push({ key: tableRows.length });
    this.setState({ tableRows });
  }

  renderInput(el, record, index) {
    const { data } = this.props;
    const { currentUser } = this.context;
    let disabled = false;
    if (currentUser.isSupplier && index < 8) {
      disabled = true;
    } else if (!currentUser.isSupplier && index > 7) {
      disabled = true;
    }
    return (
      <Input
        defaultValue={
          data && data.tableRows[record.key]
            ? data.tableRows[record.key][el.dataIndex]
            : ''
        }
        disabled={disabled}
        placeholder={el.title}
        id={el.dataIndex}
        onChange={e => this.onChange(e, record)}
      />
    );
  }

  renderUpload(el, record) {
    const { data } = this.props;
    return (
      <Uploader
        initialFile={
          data && data.tableRows[record.key]
            ? data.tableRows[record.key][el.dataIndex]
            : {}
        }
        onReceiveFile={args => this.onFileUpload(args, record, el.dataIndex)}
      />
    );
  }

  renderSelect(el, record) {
    return (
      <Select
        placeholder="Choose one"
        id={el.dataIndex}
        onSelect={e => this.onChange(e, record)}
      >
        {this.renderOptions(booleanData)}
      </Select>
    );
  }

  render() {
    const { companies } = this.props.location.state || {};
    const { tableRows } = this.state;
    const { currentUser } = this.context;
    const { data } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <TabPane tab="Publish RFQ" key="1">
              {!currentUser.isSupplier ? (
                <Email
                  companies={data.companies ? data.companies : companies}
                  renderField={props => this.renderField(props)}
                  renderOptions={props => this.renderOptions(props)}
                  onEmailHtmlEdit={props => (this.emailHtml = props)}
                  emailHtml={this.emailHtml}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  file={data.file}
                  fileUpload={(...args) => this.fileUpload(...args)}
                />
              ) : (
                <div>
                  <div>
                    <strong>Tender name: </strong>
                    {data.tenderName}
                  </div>
                  <div>
                    <strong>Tender number: </strong>
                    {data.tenderNumber}
                  </div>
                  <div>
                    <strong>Start date: </strong>
                    {data.startDate}
                  </div>
                  <div>
                    <strong>End date: </strong>
                    {data.endDate}
                  </div>
                  <div>
                    <strong>Document: </strong>
                    {data.file}
                  </div>
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: this.emailHtml }} />
                </div>
              )}
            </TabPane>

            <TabPane tab="Form" key="2">
              {!currentUser.isSupplier && (
                <Button onClick={this.addRow}>Add row</Button>
              )}
              <Table
                className="margin form-table"
                columns={this.columns}
                dataSource={tableRows}
                pagination={false}
                size="middle"
                scroll={this.columns.length > 6 ? { x: 3000 } : {}}
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

Publish.propTypes = propTypes;
Publish.contextTypes = {
  currentUser: PropTypes.object
};

const PublishForm = Form.create()(Publish);

export default withRouter(PublishForm);
