import React from 'react';
import { withRouter } from 'react-router';
import { Form, TreeSelect, Card, Alert, Button } from 'antd';
import { Field, BaseForm } from 'modules/common/components';
import { productDescription } from '../constants';
import productsTree from '../../../productsTree';

class RegistrationForm extends BaseForm {
  handleSubmit(e) {
    e.preventDefault();

    this.saveDirect(this.getFieldValue('productsInfo'), true);
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
        <Button
          onClick={() => this.props.send()}
          type="primary"
          style={{ float: 'right', marginLeft: '8px' }}
        >
          Submit
        </Button>
        {this.renderSubmit('Save', this.handleSubmit, true)}
      </Form>
    );
  }
}

const ProductsForm = Form.create()(RegistrationForm);

export default withRouter(ProductsForm);
