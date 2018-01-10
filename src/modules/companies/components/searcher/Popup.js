import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Select } from 'antd';

const propTypes = {
  suppliers: PropTypes.array,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onSearch: PropTypes.func,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  slogan: PropTypes.string
};

class Popup extends React.Component {
  render() {
    const {
      visible,
      onSearch,
      onOk,
      onCancel,
      onSelect,
      suppliers,
      slogan
    } = this.props;

    return (
      <Modal
        okText={slogan || 'Invite'}
        cancelText="Cancel"
        title={`${slogan || 'Invite'} a new supplier`}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          onSelect={onSelect}
          onSearch={onSearch}
        >
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
