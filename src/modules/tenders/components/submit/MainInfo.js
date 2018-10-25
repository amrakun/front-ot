import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Row, Col } from 'antd';
import moment from 'moment';
import { dateTimeFormat as dFormat, colors } from 'modules/common/constants';
import { readFileUrl } from 'modules/common/utils';
import { HelpModal } from 'modules/common/components';

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

  renderAttachment() {
    const { file } = this.props;
    const { __ } = this.context;

    if (!file) {
      return '-';
    }

    const link = <a href={readFileUrl(file.url)}>{__('Download')}</a>;

    return this.renderCard(__('Document'), link, 'file');
  }

  render() {
    const { type, name, number, publishDate, closeDate, content } = this.props;

    const renderCard = this.renderCard;
    const { __ } = this.context;

    return (
      <div>
        <Row gutter={16}>
          {renderCard(__('Name'), name, 'profile')}
          {renderCard(__('Number'), number, 'profile')}
          {this.renderAttachment()}
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
            __('Need help?'),
            <HelpModal videoId={type} />,
            'question-circle-o'
          )}
        </Row>

        <Card className="margin" title={__('Information')}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Card>
      </div>
    );
  }
}

MainInfo.propTypes = {
  type: PropTypes.string,
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
