import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon } from 'antd';
import { Popup } from '../../containers/addCompany';

const propTypes = {
  onAdd: PropTypes.func.isRequired
};

class AddCompany extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.showPopup = this.showPopup.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
  }

  showPopup() {
    this.setState({ visible: true });
  }

  onOk(supplier) {
    this.props.onAdd(supplier);
    this.setState({ visible: false });
  }

  onCancel() {
    this.setState({ visible: false });
  }

  renderPopup() {
    const { visible } = this.state;

    if (visible) {
      return (
        <Popup visible={visible} onOk={this.onOk} onCancel={this.onCancel} />
      );
    }
  }

  render() {
    return (
      <span>
        <Tag onClick={this.showPopup} className="dashed-button">
          <Icon type="plus" /> Invite a new supplier
        </Tag>
        {this.renderPopup()}
      </span>
    );
  }
}

AddCompany.propTypes = propTypes;

export default AddCompany;
