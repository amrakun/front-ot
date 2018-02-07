import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';
import { BaseForm } from 'modules/common/components';

const propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  registerSupplier: PropTypes.func
};

class Popup extends BaseForm {
  constructor(props) {
    super(props);

    this.onOk = this.onOk.bind(this);
  }

  onOk() {
    this.props.form.validateFieldsAndScroll(err => {
      if (!err) {
        let doc = {};

        this.fieldDefs.forEach(({ name, dataType }) => {
          doc[name] = this.getFieldValue(name, dataType);
        });

        this.props.registerSupplier(doc);
      }
    });
  }

  render() {
    const { visible, onCancel } = this.props;

    return (
      <Modal
        okText="Invite"
        cancelText="Cancel"
        title="Invite a new supplier"
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
        <Form>
          {this.renderField({
            name: 'companyName',
            label: 'Company name',
            control: <Input />
          })}
          {this.renderField({
            name: 'contactPersonName',
            label: 'Contact person name',
            control: <Input />
          })}
          {this.renderField({
            name: 'contactPersonPhone',
            label: 'Contact person phone',
            control: <Input type="number" />
          })}
          {this.renderField({
            name: 'contactPersonEmail',
            label: 'Contact person email',
            validation: 'email',
            control: <Input />
          })}
        </Form>
      </Modal>
    );
  }
}

Popup.propTypes = propTypes;

const PopupForm = Form.create()(Popup);

export default PopupForm;
