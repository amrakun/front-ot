import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Form, TreeSelect, Card, Alert, message } from 'antd';
import { Field, BaseForm } from 'modules/common/components';
import { productDescription } from '../constants';
import productsTree from '../../../productsTree';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  help: {
    id: 'help',
    defaultMessage: 'Help'
  },
  placeholder: {
    id: 'selectProducts',
    defaultMessage: 'Please select products'
  },
  product: {
    id: 'productsDesc',
    defaultMessage: productDescription
  }
});

class RegistrationForm extends BaseForm {
  handleSubmit(e) {
    e.preventDefault();

    const productCodes = this.getFieldValue('productsInfo');

    if (productCodes.length < 21)
      this.saveDirect(this.getFieldValue('productsInfo'), true);
    else message.error('Please choose maximum of 20 product codes');
  }

  render() {
    const { formatMessage } = this.context;

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
                searchPlaceholder={formatMessage(messages.placeholder)}
                allowClear
              />
            }
          />
          <Alert
            message={formatMessage(messages.help)}
            description={formatMessage(messages.product)}
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
  formatMessage: PropTypes.func
};

const ProductsForm = Form.create()(RegistrationForm);

export default withRouter(ProductsForm);
