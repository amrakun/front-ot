import React from 'react';
import { Icon, Card, Tooltip } from 'antd';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';

function NumberCard(props) {
  const { icon, color, title, number, tooltip, onClick } = props;

  return (
    <Card
      className={`numberCard ${onClick && 'clickable'}`}
      onClick={onClick}
      bodyStyle={{ padding: 0 }}
    >
      <Tooltip title={tooltip} placement="bottom">
        <div className="flexBox">
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
        </div>
      </Tooltip>
    </Card>
  );
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.node,
  number: PropTypes.number,
  countUp: PropTypes.object,
  tooltip: PropTypes.string,
  onClick: PropTypes.func
};

export default NumberCard;
