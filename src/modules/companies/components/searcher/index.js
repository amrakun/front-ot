import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, Icon } from 'antd';
import { Popup } from '../../containers/searcher';

const propTypes = {
  withTag: PropTypes.bool,
  onSelect: PropTypes.func
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

    this.setState({ visible: false });

    this.props.onSelect(selectedValues);
  }

  onSearch(value) {
    this.setState({ searchValue: value });
  }

  onCancel() {
    this.setState({ visible: false });
  }

  onSelect(value) {
    const { selectedValues } = this.state;

    if (!selectedValues.includes(value)) {
      selectedValues.push(value);

      this.setState({ selectedValues });
    }
  }

  renderPopup() {
    const { searchValue, visible } = this.state;

    if (visible) {
      return (
        <Popup
          searchValue={searchValue}
          visible={visible}
          onSearch={this.onSearch}
          onOk={this.onOk}
          onCancel={this.onCancel}
          onSelect={this.onSelect}
        />
      );
    }
  }

  render() {
    const { withTag } = this.props;

    return (
      <span>
        {!withTag && (
          <Button disabled onClick={this.showPopup}>
            Invite a new supplier
          </Button>
        )}

        {withTag && (
          <Tag onClick={this.showPopup} className="dashed-button">
            <Icon type="plus" /> Invite a new supplier
          </Tag>
        )}

        {this.renderPopup()}
      </span>
    );
  }
}

SupplierSearcher.propTypes = propTypes;

export default SupplierSearcher;
