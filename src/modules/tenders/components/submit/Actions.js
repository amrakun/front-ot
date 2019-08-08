import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

export default class Actions extends React.Component {
  renderNotInterested() {
    const { response, __, onNotInterested } = this.props;

    if (response && response.isNotInterested) {
      return null;
    }

    return (
      <Button
        style={{ marginRight: '16px' }}
        type="danger"
        htmlType="button"
        onClick={onNotInterested}
      >
        {__('Not interested')}
      </Button>
    );
  }

  render() {
    const { tender, __, onSaveDraft, onSubmit } = this.props;

    if (tender.status !== 'open') {
      return null;
    }

    return (
      <>
        <div className="margin">
          {this.renderNotInterested()}
          <Button style={{ marginRight: '16px' }} htmlType="button" onClick={onSaveDraft}>
            {__('Save as draft')}
          </Button>
          <Button type="primary" htmlType="button" onClick={onSubmit}>
            {__('Save & submit')}
          </Button>
        </div>
      </>
    );
  }
}

Actions.propTypes = {
  tender: PropTypes.object,
  onSaveDraft: PropTypes.func,
  onSubmit: PropTypes.func,
  onNotInterested: PropTypes.func,
  response: PropTypes.object,
  __: PropTypes.func,
};
