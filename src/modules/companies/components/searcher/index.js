import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon } from 'antd';
import { Popup } from '../../containers/searcher';

const propTypes = {
  onSelect: PropTypes.func,
  slogan: PropTypes.string,
  mode: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.array
};

class SupplierSearcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      searchValue: '',
      selectedValues: []
    };

    this.showPopup = this.showPopup.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  showPopup() {
    this.setState({ visible: true });
  }

  onOk() {
    const selectedValues = this.state.selectedValues.map(ss => JSON.parse(ss));

    this.props.onSelect(selectedValues);
    this.setState({ visible: false, selectedValues: [] });
  }

  onSearch(value) {
    this.setState({ searchValue: value });
  }

  onCancel() {
    this.setState({ visible: false, selectedValues: [] });
  }

  onSelect(value) {
    const { selectedValues } = this.state;

    if (!selectedValues.includes(value)) {
      selectedValues.push(value);

      this.setState({ selectedValues });
    }
  }

  renderPopup(onlySelect) {
    const { searchValue, visible } = this.state;

    if (visible || onlySelect) {
      return (
        <Popup
          searchValue={searchValue}
          visible={visible}
          onSearch={this.onSearch}
          onOk={this.onOk}
          onCancel={this.onCancel}
          onSelect={this.onSelect}
          onChange={this.props.onChange}
          slogan={this.props.slogan}
          mode={this.props.mode}
          value={this.props.value}
        />
      );
    }
  }

  render() {
    const { slogan, mode } = this.props;

    return mode === 'select' ? (
      //render only supplier select without modal
      this.renderPopup(true)
    ) : (
      <span>
        <Tag onClick={this.showPopup} className="dashed-button">
          <Icon type="plus" /> {`${slogan || 'Add'} an existing supplier`}
        </Tag>

        {this.renderPopup()}
      </span>
    );
  }
}

SupplierSearcher.propTypes = propTypes;

export default SupplierSearcher;
