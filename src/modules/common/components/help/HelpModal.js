import React from 'react';
import { Modal, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import videoIds from './videoIds';

class HelpModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this._onReady = this._onReady.bind(this);
  }

  showModal() {
    this.setState({ visible: true });

    this.player && this.player.playVideo();
  }

  hideModal() {
    this.setState({ visible: false });
  }

  handleClose() {
    this.hideModal();

    this.player && this.player.pauseVideo();
  }

  _onReady(e) {
    this.player = e.target;
  }

  render() {
    const { visible } = this.state;
    const { videoId } = this.props;
    const { __ } = this.context;

    const opts = {
      width: '800',
      height: '450',
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
        fs: 0
      }
    };

    return (
      <span>
        <Button
          type="default"
          size="small"
          style={{ height: '19px' }}
          onClick={this.showModal}
        >
          <Icon type="question-circle-o" /> {__('Help')}
        </Button>
        <Modal
          className="video-modal"
          visible={visible}
          title={
            <span>
              <Icon type="question-circle-o" /> {__('Help')}
            </span>
          }
          onCancel={this.handleClose}
          footer={null}
          width={800}
        >
          <div className="video-container">
            <YouTube
              videoId={videoIds[videoId]}
              opts={opts}
              onReady={this._onReady}
            />
          </div>
        </Modal>
      </span>
    );
  }
}

HelpModal.propTypes = {
  videoId: PropTypes.node
};

HelpModal.contextTypes = {
  __: PropTypes.func
};

export default HelpModal;
