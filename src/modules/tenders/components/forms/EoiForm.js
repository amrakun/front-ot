import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Form, Table, Button } from 'antd';
import { eoiProductsColumns, eoiEmailTemplate } from '../../constants';
import TenderForm from './TenderForm';

const TabPane = Tabs.TabPane;

const initialProducts = [
  { key: Math.random(), document: 'Scope specific experience' },
  { key: Math.random(), document: 'Customer reference /atleast 2/' },
  { key: Math.random(), document: 'Special licences if applicable (copy)' }
];

class EoiForm extends TenderForm {
  componentDidMount() {
    if (!this.state.content) {
      this.setState({ content: eoiEmailTemplate });
    }
  }
  render() {
    const rpc = eoiProductsColumns;
    const { products } = this.state;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <Tabs.TabPane tab="Publish EOI" key="1">
              {this.renderMainInfo(eoiEmailTemplate)}
            </Tabs.TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addProductRow}>Add row</Button>
              <Table
                className="margin form-table"
                dataSource={products.length > 0 ? products : initialProducts}
                pagination={false}
                size="middle"
              >
                {this.renderProductColumn('document', rpc.document)}
                {this.renderProductColumn(
                  'isSubmitted',
                  rpc.isSubmitted,
                  'select'
                )}
                {this.renderProductColumn(
                  'documentFileName',
                  rpc.documentFileName
                )}
                {this.renderProductColumn('notes', rpc.notes)}
              </Table>
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

EoiForm.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(EoiForm);

export default withRouter(form);
