import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Form, Button } from 'antd';
import TenderForm from './forms/TenderForm';
import EoiForm from './forms/EoiForm';
import RfqForm from './forms/RfqForm';

const TabPane = Tabs.TabPane;

class SubmitTender extends TenderForm {
  render() {
    const { products } = this.state;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="card-container">
          <Tabs type="card" className="send-rfq">
            <Tabs.TabPane tab="Main info" key="1" />

            <TabPane tab="Form" key="2">
              <RfqForm
                products={products}
                renderProductColumn={this.renderProductColumn}
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

SubmitTender.propTypes = {
  data: PropTypes.object
};

const form = Form.create()(SubmitTender);

export default withRouter(form);
