import React from 'react';
import { Icon, Card } from 'antd';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';

function NumberCard(props) {
  const { icon, color, title, number } = props;
  return (
    <Card className="numberCard" bodyStyle={{ padding: 0 }}>
      <Icon className="iconWarp" style={{ color }} type={icon} />
      <div className="content">
        <p className="title">{title || 'No Title'}</p>
        <p className="number">
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...props.countUp || {}}
          />
        </p>
      </div>
    </Card>
  );
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object
};

export default NumberCard;
