/* eslint-disable react/no-unescaped-entities*/

import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, Modal, Alert } from 'antd';
import Template from 'modules/settings/components/templates/Template';

export default class Prequalifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showUnqualifyModal: false };

    this.onUnqualify = this.onUnqualify.bind(this);
  }

  onUnqualify(doc) {
    this.setState({ showUnqualifyModal: false });

    this.props.prequalify(false, doc);
  }

  renderUnqualifyModal() {
    if (!this.state.showUnqualifyModal) {
      return null;
    }

    const { template } = this.props;

    return (
      <Modal
        title="Evaluation"
        visible={true}
        width={700}
        onCancel={() => this.setState({ showUnqualifyModal: false })}
        onOk={this.handleSubmit}
        footer={null}
      >
        <Template onSubmit={this.onUnqualify} buttonText="Unqualify" template={template} />

        <br />
        <br />
        <br />
      </Modal>
    );
  }

  render() {
    const { isPrequalified, prequalify } = this.props;

    return (
      <div style={{ marginBottom: '30px' }}>
        {isPrequalified && (
          <Alert message="This supplier is pre-qualified" type="success" showIcon />
        )}

        {isPrequalified === false && (
          <Alert
            message={
              <span>
                This supplier is not pre-qualfied. Click&nbsp;
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => prequalify(true)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#here">here</a>
                </Popconfirm>
                &nbsp;to pre-qualify
              </span>
            }
            type="error"
            showIcon
          />
        )}

        {isPrequalified === null && (
          <Alert
            message={
              <span>
                This supplier is not evaluated. Click&nbsp;
                <Popconfirm
                  title="Evaluation"
                  onConfirm={() => prequalify(true)}
                  onCancel={() => this.setState({ showUnqualifyModal: true })}
                  okText="Qualified"
                  cancelText="Unqualified"
                >
                  <a href="#here">here</a>
                </Popconfirm>
                &nbsp;to evaluate
              </span>
            }
            type="warning"
            showIcon
          />
        )}

        {this.renderUnqualifyModal()}
      </div>
    );
  }
}

Prequalifier.propTypes = {
  template: PropTypes.object,
  isPrequalified: PropTypes.bool,
  prequalify: PropTypes.func,
};
