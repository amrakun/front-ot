import React from 'react';
import { withRouter } from 'react-router';
import { Form, TreeSelect, Card, Alert } from 'antd';
import { Field, BaseForm } from 'modules/common/components';
import { productDescription } from '../constants';
import productsTree from '../../../productsTree';

class RegistrationForm extends BaseForm {
  handleSubmit(e) {
    e.preventDefault();

    this.saveDirect(this.getFieldValue('productsInfo'));
  }

  render() {
    return (
      <Form>
        <Card>
          <Field
            label="Product codes"
            initialValue={this.props.data}
            name="productsInfo"
            control={
              <TreeSelect
                treeData={productsTree}
                treeCheckable={true}
                searchPlaceholder="Please select products"
              />
            }
          />
          <Alert
            message="Help"
            description={productDescription}
            type="info"
            style={{ marginBottom: '24px' }}
          />
        </Card>

        {this.renderGoBack()}
        {this.renderSubmit('Save & submit')}
      </Form>
    );
  }
}

const ProductsForm = Form.create()(RegistrationForm);

export default withRouter(ProductsForm);
