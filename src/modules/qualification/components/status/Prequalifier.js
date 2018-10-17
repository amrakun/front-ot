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

    this.props.prequalifySupplier(false, doc);
  }

  renderUnqualifyModal() {
    if (!this.state.showUnqualifyModal) {
      return null;
    }

    const { systemConfig } = this.context;
    const templates = systemConfig.prequalificationTemplates || {};

    const template = templates.supplier__failed || {
      from: '',
      subject: { mn: '', en: '' },
      content: { mn: '', en: '' }
    };

    return (
      <Modal
        title="Evaluation"
        visible={true}
        width={700}
        onCancel={() => this.setState({ showUnqualifyModal: false })}
        onOk={this.handleSubmit}
        footer={null}
      >
        <Template
          onSubmit={this.onUnqualify}
          buttonText="Unqualify"
          template={template}
        />

        <br />
        <br />
        <br />
      </Modal>
    );
  }

  render() {
    const { isPrequalified, prequalifySupplier } = this.props;

    return (
      <div>
        {isPrequalified === false && (
          <Alert
            message={
              <span>
                This supplier is not pre-qualfied. Click&nbsp;
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => prequalifySupplier(true)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a>here</a>
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
                  onConfirm={() => prequalifySupplier(true)}
                  onCancel={() => this.setState({ showUnqualifyModal: true })}
                  okText="Qualified"
                  cancelText="Unqualified"
                >
                  <a>here</a>
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
  isPrequalified: PropTypes.bool,
  prequalifySupplier: PropTypes.func
};

Prequalifier.contextTypes = {
  systemConfig: PropTypes.object
};
