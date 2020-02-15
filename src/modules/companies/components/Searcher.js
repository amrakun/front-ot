import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Select, Tag, Icon, Tooltip } from 'antd';
import { colors } from 'modules/common/constants';

const propTypes = {
  onSelect: PropTypes.func,
  title: PropTypes.string,
  onShowPopup: PropTypes.func,
  onSearch: PropTypes.func,
  initialChosenSuppliers: PropTypes.array,
  optionsSuppliers: PropTypes.array,
};

class SupplierSearcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selectedSuppliers: [], // suppliers selected in combobox
      chosenSuppliers: (props.initialChosenSuppliers || []).map(s => ({ ...s })), // final suppliers aka suppliers in tag
    };

    this.showPopup = this.showPopup.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  showPopup() {
    this.setState({ visible: true });

    this.props.onShowPopup();
  }

  onCancel() {
    this.setState({ visible: false, selectedSuppliers: [] });
  }

  findDuplicates(array) {
    let result = [];

    array.forEach((element, index) => {
      if (array.indexOf(element, index + 1) > -1) {
        if (result.indexOf(element) === -1) {
          result.push(element);
        }
      }
    });

    return result;
  }

  getOwner(supplier) {
    const info = supplier.shareholderInfo || {};

    if (!info) {
      return null;
    }

    if (info.shareholders && info.shareholders.length > 0) {
      return info.shareholders[0].name;
    }
  }

  setColors(array) {
    let result = {};

    array.forEach((element, index) => {
      result[element] = colors[index] || '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    });

    return result;
  }

  getColoredTags() {
    const { chosenSuppliers } = this.state;

    let ownerNames = [];

    chosenSuppliers.forEach(supplier => {
      const owner = this.getOwner(supplier);
      if (owner) ownerNames.push(owner);
    });

    return this.setColors(this.findDuplicates(ownerNames));
  }

  onChange(supplierIds) {
    const suppliers = this.props.optionsSuppliers.filter(s => supplierIds.includes(s._id));

    this.setState({ selectedSuppliers: suppliers });
  }

  onOk() {
    const { selectedSuppliers, chosenSuppliers } = this.state;
    const chosenSupplierIds = chosenSuppliers.map(s => s._id);

    const updatedChosenSuppliers = [...chosenSuppliers];

    selectedSuppliers.forEach(supplier => {
      // Only add new suppliers
      if (!chosenSupplierIds.includes(supplier._id)) {
        updatedChosenSuppliers.push(supplier);
      }
    });

    this.setState({
      visible: false,
      selectedSuppliers: [],
      chosenSuppliers: updatedChosenSuppliers,
    });

    this.props.onSelect(updatedChosenSuppliers);
  }

  removeSupplier(supplierId) {
    const { chosenSuppliers } = this.state;

    const updatedChosenSuppliers = [];

    chosenSuppliers.forEach(supplier => {
      if (supplier._id !== supplierId) updatedChosenSuppliers.push(supplier);
    });

    this.setState({ chosenSuppliers: updatedChosenSuppliers });

    this.props.onSelect(updatedChosenSuppliers);
  }

  renderChosenSupplier() {
    const { chosenSuppliers } = this.state;

    const suppliers = [...chosenSuppliers, ...(this.props.newlyInvitedSuppliers || [])];

    const coloredTags = this.getColoredTags();

    return suppliers.map(supplier => {
      const owner = this.getOwner(supplier);
      const basicInfo = supplier.basicInfo || {};

      return (
        <Tooltip key={supplier._id} title={owner ? `Owner: ${owner}` : ''}>
          <Tag
            color={coloredTags[owner] || null}
            key={supplier._id}
            closable={true}
            afterClose={() => this.removeSupplier(supplier._id)}
          >
            {basicInfo.enName}
          </Tag>
        </Tooltip>
      );
    });
  }

  renderSelect() {
    const { optionsSuppliers, onSearch } = this.props;
    const { selectedSuppliers } = this.state;

    const optionsSupplierIds = optionsSuppliers.map(s => s._id);
    const options = optionsSuppliers;

    for (const supplier of selectedSuppliers) {
      if (!optionsSupplierIds.includes(supplier._id)) {
        options.push(supplier);
      }
    }

    const selectProps = {
      mode: 'multiple',
      style: { width: '100%' },
      onSearch: onSearch,
      onChange: this.onChange,
      value: selectedSuppliers.map(s => s._id),
      filterOption: false,
    };

    return (
      <Select {...selectProps}>
        {options.map(supplier => (
          <Select.Option key={supplier._id}>{supplier.basicInfo.enName}</Select.Option>
        ))}
      </Select>
    );
  }

  render() {
    const { title } = this.props;

    return (
      <>
        {this.renderChosenSupplier()}

        <Tag onClick={this.showPopup} className="dashed-button">
          <Icon type="plus" /> {title || 'Select suppliers'}
        </Tag>

        <Modal
          okText={'select'}
          cancelText="Cancel"
          maskClosable={false}
          title={title || 'Select suppliers'}
          visible={this.state.visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          {this.renderSelect()}
        </Modal>
      </>
    );
  }
}

SupplierSearcher.propTypes = propTypes;

export default SupplierSearcher;
