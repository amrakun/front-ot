import React from 'react';
import { withRouter } from 'react-router';
import { Form, TreeSelect, Card, Alert, message } from 'antd';
import { Field, BaseForm } from 'modules/common/components';
import { productDescription } from '../constants';
import productsTree from '../../../productsTree';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import { _t } from 'modules/common/components';

const messages = defineMessages({
  help: {
    id: 'help',
    defaultMessage: 'Help'
  },
  product: {
    id: 'productsDesc',
    defaultMessage: productDescription
  },
  placeholder: {
    id: 'selectProducts',
    defaultMessage: 'Please select products'
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
    const { formatMessage } = this.props.intl;

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

RegistrationForm.propTypes = {
  intl: intlShape.isRequired
};

const ProductsForm = Form.create()(RegistrationForm);

export default injectIntl(withRouter(ProductsForm));
