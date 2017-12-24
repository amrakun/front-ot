import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Form, Button } from 'antd';
import { rfqEmailTemplate } from '../constants';
import TenderForm from './forms/TenderForm';
import RfqForm from './forms/RfqForm';

const TabPane = Tabs.TabPane;
const initialProducts = [{ key: Math.random() }];

class CreateRfq extends TenderForm {
  componentDidMount() {
    if (!this.state.content) {
      this.setState({
        content: rfqEmailTemplate,
        products: initialProducts
      });
    }
  }
  render() {
    const { products } = this.state;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <Tabs.TabPane tab="Main info" key="1">
              {this.renderMainInfo(rfqEmailTemplate)}
            </Tabs.TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addProductRow}>Add row</Button>
              <RfqForm
                products={products}
                renderProductColumn={this.renderProductColumn}
                isSupplier={false}
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

CreateRfq.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(CreateRfq);

export default withRouter(form);
