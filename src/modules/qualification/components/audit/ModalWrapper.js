import React from 'react';
import { withRouter } from 'react-router';
import { Form, Button, Modal } from 'antd';
import PropTypes from 'prop-types';

class ModalWrapper extends React.Component {
  render() {
    const { __ } = this.context;
    const { visible, children, handleOk, hideModal, title } = this.props;

    return (
      <Modal
        title={__(title)}
        visible={visible}
        onCancel={hideModal}
        width="80%"
        style={{ top: 32 }}
        bodyStyle={{ maxHeight: '80vh', overflow: 'scroll' }}
        footer={[
          <Button key="back" onClick={hideModal}>
            {__('Return')}
          </Button>,

          <Button key="submit" type="primary" onClick={handleOk}>
            {__('Submit')}
          </Button>,
        ]}
      >
        {children}
      </Modal>
    );
  }
}

ModalWrapper.propTypes = {
  children: PropTypes.object,
  visible: PropTypes.bool,
  submitLoading: PropTypes.bool,
  handleOk: PropTypes.func,
  hideModal: PropTypes.func,
  title: PropTypes.string,
};

ModalWrapper.contextTypes = {
  __: PropTypes.func,
};

const ModalWrapperForm = Form.create()(ModalWrapper);

export default withRouter(ModalWrapperForm);
