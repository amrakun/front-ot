import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Form, Button } from 'antd';
import { eoiEmailTemplate } from '../constants';
import TenderForm from './forms/TenderForm';
import EoiForm from './forms/EoiForm';

const TabPane = Tabs.TabPane;

class CreateEoi extends TenderForm {
  componentDidMount() {
    if (!this.state.content) {
      this.setState({ content: eoiEmailTemplate });
    }
  }
  render() {
    const { products } = this.state;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <Tabs.TabPane tab="Main info" key="1">
              {this.renderMainInfo(eoiEmailTemplate)}
            </Tabs.TabPane>

            <TabPane tab="Form" key="2">
              <Button onClick={this.addProductRow}>Add row</Button>
              <EoiForm
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

CreateEoi.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(CreateEoi);

export default withRouter(form);
