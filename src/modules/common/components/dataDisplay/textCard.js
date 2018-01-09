import React from 'react';
import { Icon, Card, Badge } from 'antd';
import PropTypes from 'prop-types';

function NumberCard(props) {
  const { icon, color, title, text, badge } = props;
  return (
    <Card className="numberCard" bodyStyle={{ padding: 0 }}>
      <Badge count={badge ? 1 : 0} className="iconWarp">
        <Icon style={{ color }} type={icon} />
      </Badge>
      <div className="content">
        <p className="title">{title || 'No Title'}</p>
        <p className="text">{text}</p>
      </div>
    </Card>
  );
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.object,
  countUp: PropTypes.object,
  badge: PropTypes.bool
};

export default NumberCard;
