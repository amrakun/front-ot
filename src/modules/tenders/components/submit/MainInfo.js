import React from 'react';
import { Card, Icon, Row, Col, Modal, Button } from 'antd';
import moment from 'moment';
import { dateTimeFormat as dFormat, colors } from 'modules/common/constants';
import PropTypes from 'prop-types';

class MainInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: true
    };

    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  renderCard(title, content, type) {
    return (
      <Col xl={4} lg={6} md={8} sm={12}>
        <Card
          title={
            <span>
              <Icon
                type={type}
                style={{ color: colors[0], marginRight: '12px' }}
              />
              {title}
            </span>
          }
        >
          {content}
        </Card>
      </Col>
    );
  }

  render() {
    const { name, number, publishDate, closeDate, file, content } = this.props;
    const renderCard = this.renderCard;
    const { __ } = this.context;

    return (
      <Row gutter={16}>
        {renderCard(__('Name'))}
        {renderCard(__('Number'), number, 'profile')}
        {renderCard(
          __('Publish Date'),
          moment(publishDate).format(dFormat),
          'clock-circle-o'
        )}
        {renderCard(
          __('Close Date'),
          moment(closeDate).format(dFormat),
          'clock-circle'
        )}
        {renderCard(
          __('Document'),
          file ? <a href={file.url}>{__('Download')}</a> : '-',
          'file'
        )}
        {renderCard(
          __('Information'),
          <a onClick={this.showModal}>{__('View')}</a>,
          'info-circle-o'
        )}

        <Modal
          title={name}
          visible={this.state.modalVisible}
          onCancel={this.hideModal}
          width="700px"
          bodyStyle={{ height: '60vh', overflow: 'scroll' }}
          footer={<Button onClick={this.hideModal}>{__('Close')}</Button>}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Modal>
      </Row>
    );
  }
}

MainInfo.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  publishDate: PropTypes.number,
  closeDate: PropTypes.number,
  file: PropTypes.object,
  content: PropTypes.string
};

MainInfo.contextTypes = {
  __: PropTypes.func
};

export default MainInfo;
