/* eslint-disable react/no-unescaped-entities*/

import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, Alert } from 'antd';

export default class Prequalifier extends React.Component {
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
                  onCancel={() => prequalifySupplier(false)}
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
      </div>
    );
  }
}

Prequalifier.propTypes = {
  isPrequalified: PropTypes.bool,
  prequalifySupplier: PropTypes.func
};
