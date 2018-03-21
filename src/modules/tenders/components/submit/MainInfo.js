import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
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
      <div>
        <Row gutter={16}>
          {renderCard(__('Name'), name, 'profile')}
          {renderCard(__('Number'), number, 'profile')}
          {renderCard(
            __('Document'),
            file ? <a href={file.url}>{__('Download')}</a> : '-',
            'file'
          )}
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
        </Row>

        <Card className="margin" title={__('Information')}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Card>
      </div>
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
