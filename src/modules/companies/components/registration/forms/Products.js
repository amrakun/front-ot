import React from 'react';
import { withRouter } from 'react-router';
import { Form, TreeSelect, Card } from 'antd';
import { Field, BaseForm } from 'modules/common/components';
import { productDescription } from '../constants';
import productsTree from '../../../productsTree';

class RegistrationForm extends BaseForm {
  save() {
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
            description={productDescription}
            control={
              <TreeSelect
                treeData={productsTree}
                treeCheckable={true}
                searchPlaceholder="Please select products"
                style={{ width: '100%' }}
              />
            }
          />
        </Card>
        {this.renderSubmit('Save')}
      </Form>
    );
  }
}

const ProductsForm = Form.create()(RegistrationForm);

export default withRouter(ProductsForm);
