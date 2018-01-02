import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Tag, Icon } from 'antd';

const Search = Input.Search;

const propTypes = {
  withTag: PropTypes.bool
};

class AddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }
  showModal() {
    this.setState({ visible: true });
  }
  handleInsert() {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ visible: false, confirmLoading: false });
    }, 2000);
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  render() {
    const { withTag } = this.props;
    return (
      <span>
        {!withTag && (
          <Button disabled onClick={this.showModal}>
            Add supplier
          </Button>
        )}
        {withTag && (
          <Tag onClick={this.showModal} className="dashed-button">
            <Icon type="plus" /> Add supplier
          </Tag>
        )}
        <Modal
          okText="Add"
          cancelText="Cancel"
          title="Add new supplier"
          visible={this.state.visible}
          onOk={this.handleInsert}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <Search
            placeholder="Supplier name"
            style={{ width: '100%' }}
            onSearch={value => console.log(value)}
          />
        </Modal>
      </span>
    );
  }
}

AddNew.propTypes = propTypes;

export default AddNew;
