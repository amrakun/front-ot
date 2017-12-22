import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Form, Table, Button } from 'antd';
import { rfqProductsColumns, rfqEmailTemplate } from '../../constants';
import TenderForm from './TenderForm';

const TabPane = Tabs.TabPane;
const initialProducts = [{ key: Math.random() }];

class RfqForm extends TenderForm {
  componentDidMount() {
    if (!this.state.content) {
      this.setState({ content: rfqEmailTemplate });
    }
  }
  render() {
    const rpc = rfqProductsColumns;
    const { products } = this.state;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <Tabs.TabPane tab="Publish RFQ" key="1">
              {this.renderMainInfo(rfqEmailTemplate)}
            </Tabs.TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addProductRow}>Add row</Button>
              <Table
                className="margin form-table"
                dataSource={products.length > 0 ? products : initialProducts}
                pagination={false}
                size="middle"
                scroll={{ x: 3000 }}
              >
                {this.renderProductColumn('code', rpc.code)}
                {this.renderProductColumn(
                  'purchaseRequestNumber',
                  rpc.purchaseRequestNumber,
                  'number'
                )}
                {this.renderProductColumn('shortText', rpc.shortText)}
                {this.renderProductColumn('quantity', rpc.quantity, 'number')}
                {this.renderProductColumn('uom', rpc.uom)}
                {this.renderProductColumn('manufacturer', rpc.manufacturer)}
                {this.renderProductColumn(
                  'manufacturerPart',
                  rpc.manufacturerPart
                )}
                {this.renderProductColumn(
                  'suggestedManufacturer',
                  rpc.suggestedManufacturer
                )}
                {this.renderProductColumn(
                  'suggestedManufacturerPart',
                  rpc.suggestedManufacturerPart
                )}
                {this.renderProductColumn('unitPrice', rpc.unitPrice, 'number')}
                {this.renderProductColumn(
                  'totalPrice',
                  rpc.totalPrice,
                  'number'
                )}
                {this.renderProductColumn('leadTime', rpc.leadTime, 'number')}
                {/* {this.renderProductColumn('shippingTerms', rpc.shippingTerms)} */}
                {this.renderProductColumn('comment', rpc.comment)}
                {this.renderProductColumn('picture', rpc.picture, 'uploader')}
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

RfqForm.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(RfqForm);

export default withRouter(form);
