import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, Icon } from 'antd';
import { Modal } from '../../containers/searcher';

const propTypes = {
  withTag: PropTypes.bool,
  onSelect: PropTypes.func
};

class SupplierSearcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selectedValues: []
    };

    this.showModal = this.showModal.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  }

  onOk() {
    const selectedValues = this.state.selectedValues.map(ss => JSON.parse(ss));

    this.setState({ visible: false });

    this.props.onSelect(selectedValues);
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

  renderModal() {
    const { selectedValues, visible } = this.state;

    if (visible) {
      return (
        <Modal
          selectedValues={selectedValues}
          visible={visible}
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
          <Button disabled onClick={this.showModal}>
            Invite a new supplier
          </Button>
        )}

        {withTag && (
          <Tag onClick={this.showModal} className="dashed-button">
            <Icon type="plus" /> Invite a new supplier
          </Tag>
        )}

        {this.renderModal()}
      </span>
    );
  }
}

SupplierSearcher.propTypes = propTypes;

export default SupplierSearcher;
