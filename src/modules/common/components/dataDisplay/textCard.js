import React from 'react';
import { Icon, Card } from 'antd';
import PropTypes from 'prop-types';

function NumberCard(props) {
  const { icon, color, title, text } = props;
  return (
    <Card className="numberCard" bodyStyle={{ padding: 0 }}>
      <Icon className="iconWarp" style={{ color }} type={icon} />
      <div className="content">
        <p className="title">{title || 'No Title'}</p>
        <p className="number">{text}</p>
      </div>
    </Card>
  );
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  countUp: PropTypes.object
};

export default NumberCard;
