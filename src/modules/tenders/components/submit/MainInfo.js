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

    return (
      <Row gutter={16}>
        {renderCard('Name', name, 'idcard')}
        {renderCard('Number', number, 'profile')}
        {renderCard(
          'Publish date',
          moment(publishDate).format(dFormat),
          'clock-circle-o'
        )}
        {renderCard(
          'Close date',
          moment(closeDate).format(dFormat),
          'clock-circle'
        )}
        {renderCard(
          'Document',
          file ? <a href={file.url}>Download</a> : '-',
          'file'
        )}
        {renderCard(
          'Information',
          <a onClick={this.showModal}>View</a>,
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

export default MainInfo;
