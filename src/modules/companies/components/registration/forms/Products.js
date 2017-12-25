import React from 'react';
import { withRouter } from 'react-router';
import { Form, TreeSelect, Card } from 'antd';
import { Field, BaseForm } from 'modules/common/components';
import { productDescription } from '../constants';
import { treeData } from '../../../constants';

class RegistrationForm extends BaseForm {
  save() {
    return this.props.save(this.getFieldValue('productsInfo'));
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
                treeData={treeData}
                treeCheckable={true}
                searchPlaceholder="Please select products"
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                style={{ width: '100%' }}
              />
            }
          />
        </Card>
        {this.renderSubmit()}
      </Form>
    );
  }
}

const ProductsForm = Form.create()(RegistrationForm);

export default withRouter(ProductsForm);
