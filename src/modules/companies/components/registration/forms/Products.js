import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Card, Alert, message } from 'antd';
import { Field, BaseForm, ProductsTree } from 'modules/common/components';
import { productDescription } from '../constants';

class RegistrationForm extends BaseForm {
  handleSubmit(e) {
    e.preventDefault();

    const { __ } = this.context;
    const productCodes = this.getFieldValue('productsInfo');

    if (productCodes.length < 21)
      this.saveDirect(this.getFieldValue('productsInfo'), true);
    else message.error(__('You can not choose 20+ product and service codes'));
  }

  render() {
    const { __ } = this.context;

    return (
      <Form>
        <Card>
          <Field
            label="Product codes"
            initialValue={this.props.data}
            name="productsInfo"
            control={
              <ProductsTree searchPlaceholder={__('Please select products')} />
            }
          />
          <Alert
            message={__('Help')}
            description={__(productDescription)}
            type="info"
            style={{ marginBottom: '24px' }}
          />
        </Card>

        {this.renderGoBack()}
        {this.renderSubmit('Save & submit', this.handleSubmit)}
      </Form>
    );
  }
}

RegistrationForm.contextTypes = {
  __: PropTypes.func,
  locale: PropTypes.string
};

const ProductsForm = Form.create()(RegistrationForm);

export default withRouter(ProductsForm);
