import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Input, Form, Table, Button, Select } from 'antd';
import BaseForm from '../../../common/components/BaseForm';
import Email from './Email';
import { rfqColumns, eoiColumns, booleanData } from '../../constants';
import { newRfqPath } from '../../../common/constants';

const propTypes = {
  location: PropTypes.object,
  tender: PropTypes.object
};
const TabPane = Tabs.TabPane;

class Publish extends BaseForm {
  constructor(props) {
    super(props);

    const { tender } = props;

    if (props.location.pathname === newRfqPath || tender.tableRows[0].UOM) {
      //RFQ
      rfqColumns.forEach(
        el =>
          (el.render = (text, record) => this.renderInput(el, record, tender))
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

    this.emailHtml = tender.emailHtml;

    this.state = {
      tableRows: tender.tableRows
    };

    this.addRow = this.addRow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { companies } = this.props.location.state;
        const { tableRows } = this.state;
        const updatedValues = {
          ...values,
          tableRows: tableRows,
          companies: companies,
          emailHtml: this.emailHtml
        };
        this.props.save('Publish', updatedValues);
      }
    });
  }

  onChange(e, record) {
    const { tableRows } = this.state;
    const value = e.target ? e.target.value : e;
    const id = e.target ? e.target.id : 'submitted';
    tableRows[record.key][id] = value;
  }

  addRow() {
    let { tableRows } = this.state;
    tableRows.push({ key: tableRows.length });
    this.setState({ tableRows });
  }

  renderInput(el, record, tender) {
    return (
      <Input
        value={
          tender && tender.tableRows[record.key]
            ? tender.tableRows[record.key][el.dataIndex]
            : ''
        }
        placeholder={el.title}
        id={el.dataIndex}
        onChange={e => this.onChange(e, record)}
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
    const { tender } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <TabPane tab="Publish RFQ" key="1">
              <Email
                companies={tender.companies ? tender.companies : companies}
                renderField={props => this.renderField(props)}
                renderOptions={props => this.renderOptions(props)}
                onEmailHtmlEdit={props => (this.emailHtml = props)}
                emailHtml={this.emailHtml}
              />
            </TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addRow}>Add row</Button>
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

const PublishForm = Form.create()(Publish);

export default withRouter(PublishForm);
