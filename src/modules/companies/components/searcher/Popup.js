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
  onChange: PropTypes.func,
  slogan: PropTypes.string,
  mode: PropTypes.string,
  value: PropTypes.array
};

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.renderSelect = this.renderSelect.bind(this);
  }

  renderSelect() {
    const { onSearch, onSelect, suppliers, onChange, value, mode } = this.props;

    return (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        value={value}
      >
        {suppliers.map(supplier => (
          <Select.Option
            key={mode === 'select' ? supplier._id : JSON.stringify(supplier)}
          >
            {supplier.basicInfo.enName}
          </Select.Option>
        ))}
      </Select>
    );
  }

  render() {
    const { visible, onOk, onCancel, slogan, mode } = this.props;

    return mode === 'select' ? (
      this.renderSelect()
    ) : (
      <Modal
        okText={slogan || 'Add'}
        cancelText="Cancel"
        title={`${slogan || 'Add'} an existing supplier`}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {this.renderSelect()}
      </Modal>
    );
  }
}

Popup.propTypes = propTypes;

export default Popup;
