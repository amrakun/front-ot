import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select } from 'antd';
import { Field, BaseForm } from 'modules/common/components';
import { productsData } from '../constants';

class RegistrationForm extends BaseForm {
  save() {
    return this.props.save(this.getFieldValue('productsInfo'));
  }

  render() {
    return (
      <Form>
        <Field
          label="Product code"
          // initialValue={this.props.data}
          name="productsInfo"
          control={
            <Select mode="multiple" placeholder="Please select products">
              {this.renderOptions(productsData)}
            </Select>
          }
        />
        {this.renderSubmit()}
      </Form>
    );
  }
}

const ProductsForm = Form.create()(RegistrationForm);

export default withRouter(ProductsForm);
