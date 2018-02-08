import React from 'react';
import { Card, Icon, Row, Col, Modal, Button } from 'antd';
import moment from 'moment';
import { dateTimeFormat as dFormat, colors } from 'modules/common/constants';
import PropTypes from 'prop-types';
import { T } from 'modules/common/components';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  tenderRegularName: {
    id: 'tenderRegularName',
    defaultMessage: 'Name'
  },
  tenderRegularNumber: {
    id: 'tenderRegularNumber',
    defaultMessage: 'Number'
  },
  tenderDocument: {
    id: 'tenderDocument',
    defaultMessage: 'Document'
  },
  tenderInformation: {
    id: 'tenderInformation',
    defaultMessage: 'Information'
  },
  tenderPublishDate: {
    id: 'tenderPublishDate',
    defaultMessage: 'Publish Date'
  },
  tenderCloseDate: {
    id: 'tenderCloseDate',
    defaultMessage: 'Close Date'
  }
});

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
    const { formatMessage } = this.context;

    return (
      <Row gutter={16}>
        {renderCard(formatMessage(messages.tenderRegularName), name, 'idcard')}
        {renderCard(
          formatMessage(messages.tenderRegularNumber),
          number,
          'profile'
        )}
        {renderCard(
          formatMessage(messages.tenderPublishDate),
          moment(publishDate).format(dFormat),
          'clock-circle-o'
        )}
        {renderCard(
          formatMessage(messages.tenderCloseDate),
          moment(closeDate).format(dFormat),
          'clock-circle'
        )}
        {renderCard(
          formatMessage(messages.tenderDocument),
          file ? (
            <a href={file.url}>
              <T id="tenderDownload">Download</T>
            </a>
          ) : (
            '-'
          ),
          'file'
        )}
        {renderCard(
          formatMessage(messages.tenderInformation),
          <a onClick={this.showModal}>
            <T id="tenderView">View</T>
          </a>,
          'info-circle-o'
        )}

        <Modal
          title={name}
          visible={this.state.modalVisible}
          onCancel={this.hideModal}
          width="700px"
          bodyStyle={{ height: '60vh', overflow: 'scroll' }}
          footer={<Button onClick={this.hideModal}>Close</Button>}
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
  formatMessage: PropTypes.func
};

export default MainInfo;
