import React from 'react';
import { Icon, Card, Badge, Tooltip } from 'antd';
import PropTypes from 'prop-types';

function NumberCard(props) {
  const { icon, color, title, text, badge, tooltip, size, onClick } = props;

  return (
    <Tooltip title={tooltip} placement="bottom">
      <Card
        className={`numberCard textCard ${size}`}
        bodyStyle={{ padding: 0 }}
        onClick={onClick}
      >
        <Badge count={badge ? 1 : 0} className="iconWarp">
          <Icon style={{ color }} type={icon} />
        </Badge>

        <div className="content">
          <p className="title">{title || 'No Title'}</p>
          <div className="text">{text}</div>
        </div>
      </Card>
    </Tooltip>
  );
}

NumberCard.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.node,
  text: PropTypes.node,
  countUp: PropTypes.object,
  badge: PropTypes.bool,
  tooltip: PropTypes.string,
  size: PropTypes.string
};

export default NumberCard;
