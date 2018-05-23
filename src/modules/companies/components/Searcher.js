import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon } from 'antd';
import { Modal, Select } from 'antd';

const propTypes = {
  onSelect: PropTypes.func,
  slogan: PropTypes.string,
  mode: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.array,
  suppliers: PropTypes.array
};

class SupplierSearcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selectedValues: props.value || []
    };

    this.showPopup = this.showPopup.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  showPopup() {
    this.setState({ visible: true });
  }

  onOk() {
    const selectedValues = this.state.selectedValues.map(ss => JSON.parse(ss));

    this.props.onSelect(selectedValues);
    this.setState({ visible: false, selectedValues: [] });
  }

  onCancel() {
    this.setState({ visible: false, selectedValues: [] });
  }

  onChange(selectedValues) {
    this.setState({ selectedValues });

    this.props.onChange(selectedValues);
  }

  renderSelect() {
    const { suppliers, mode } = this.props;
    const { selectedValues } = this.state;

    const selectProps = {
      mode: 'multiple',
      style: { width: '100%' },
      onChange: this.onChange,
      value: selectedValues,
      filterOption: (inputValue, option) =>
        option.props.children.includes(inputValue)
    };

    return (
      <Select {...selectProps}>
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

  renderModalTrigger() {
    const { slogan } = this.props;

    return (
      <span>
        <Tag onClick={this.showPopup} className="dashed-button">
          <Icon type="plus" /> {`${slogan || 'Add'} an existing supplier`}
        </Tag>

        <Modal
          okText={slogan || 'Add'}
          cancelText="Cancel"
          title={`${slogan || 'Add'} an existing supplier`}
          visible={this.state.visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          {this.renderSelect()}
        </Modal>
      </span>
    );
  }

  render() {
    const { mode } = this.props;

    return mode === 'select' ? this.renderSelect() : this.renderModalTrigger();
  }
}

SupplierSearcher.propTypes = propTypes;

export default SupplierSearcher;
