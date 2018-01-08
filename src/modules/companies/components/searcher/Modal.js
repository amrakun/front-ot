import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Select } from 'antd';

const propTypes = {
  suppliers: PropTypes.array,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func
};

class Popup extends React.Component {
  render() {
    const { visible, onOk, onCancel, onSelect, suppliers } = this.props;

    return (
      <Modal
        okText="Invite"
        cancelText="Cancel"
        title="Invite a new supplier"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Select mode="multiple" style={{ width: '100%' }} onSelect={onSelect}>
          {suppliers.map(supplier => (
            <Select.Option key={JSON.stringify(supplier)}>
              {supplier.basicInfo.enName}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    );
  }
}

Popup.propTypes = propTypes;

export default Popup;
