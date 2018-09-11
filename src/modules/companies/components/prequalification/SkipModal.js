import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Input, Alert } from 'antd';

class SkipModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { form } = this.props;

    form.validateFieldsAndScroll((err, data) => {
      if (err) {
        return;
      }

      this.props.onSubmit(data);
    });
  }

  render() {
    const { form, onCancel } = this.props;
    const { __ } = this.context;

    const { getFieldDecorator } = form;

    return (
      <Modal
        title={__('Skip prequalification')}
        visible={true}
        onCancel={onCancel}
        footer={[
          <Button key="back" size="small" onClick={onCancel}>
            {__('Return')}
          </Button>,

          <Button
            key="submit"
            type="primary"
            size="small"
            onClick={this.onSubmit}
          >
            {__('Submit')}
          </Button>
        ]}
      >
        <Form>
          <Alert
            message={__('Warning')}
            type="error"
            style={{ marginBottom: '16px' }}
          />

          <Form.Item label="Reason">
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: 'Please fill reason field'
                }
              ]
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

SkipModal.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

SkipModal.contextTypes = {
  __: PropTypes.func
};

export default Form.create()(SkipModal);
