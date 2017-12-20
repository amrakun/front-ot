import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Input, Form, Table, Button, Select } from 'antd';
import { BaseForm, Uploader } from 'modules/common/components';
import { rfqColumns, booleanData } from '../../constants';
import MainInfo from './MainInfo';

const TabPane = Tabs.TabPane;

class Publish extends BaseForm {
  constructor(props) {
    super(props);

    const { data } = props;

    this.state = {
      requestedProducts: data.requestedProducts,
      content: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEmailContentChange = this.onEmailContentChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.save({
      content: this.state.content,
      supplierIds: ['1', '2'],
      requestedProducts: [{}]
    });
  }

  onEmailContentChange(content) {
    this.setState({ content });
  }

  renderProductRows() {
    return [
      this.renderField({
        name: 'code',
        control: <Input />
      })
    ];
  }

  render() {
    const { data } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <Tabs.TabPane tab="Publish RFQ" key="1">
              <MainInfo
                data={data}
                renderField={this.renderField.bind(this)}
                renderOptions={this.renderOptions.bind(this)}
                onEmailContentChange={this.onEmailContentChange}
                onReceiveFile={(...args) => this.fileUpload(...args)}
              />
            </Tabs.TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addRow}>Add row</Button>
              <Table
                className="margin form-table"
                columns={rfqColumns}
                dataSource={this.renderProductRows(data.requestedProducts)}
                pagination={false}
                size="middle"
                scroll={rfqColumns.length > 6 ? { x: 3000 } : {}}
              />
              <br />
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

Publish.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object
};

const PublishForm = Form.create()(Publish);

export default withRouter(PublishForm);
