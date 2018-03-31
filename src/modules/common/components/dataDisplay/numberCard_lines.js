import React, { Component } from 'react';
import { Icon, Card, Progress, Tooltip } from 'antd';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';

class NumberCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: 0
    };

    this.increase = this.increase.bind(this);
  }

  increase(count) {
    let percent = this.state.percent;
    if (percent < count) {
      percent++;
      if (percent > 100) {
        percent = 100;
      }
      this.setState({ percent });
    } else {
      clearInterval(this.countdown);
    }
  }

  componentDidMount() {
    const { percent } = this.props;
    clearInterval(this.countdown);
    this.countdown = setInterval(() => this.increase(percent), 25);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  render() {
    const {
      icon,
      color,
      title,
      number,
      countUp,
      withPercent,
      tooltip,
      onClick
    } = this.props;
    const { percent } = this.state;
    this.componentDidMount();
    return (
      <Card
        className={`numberCardLines ${onClick && 'clickable'}`}
        bordered={false}
        bodyStyle={{ padding: 0 }}
        onClick={onClick}
      >
        <Tooltip title={tooltip} placement="bottom">
          <div className="flexBox">
            <Icon
              className="iconWarp"
              style={{ backgroundColor: color }}
              type={icon}
            />
            <div className="content">
              <p>{title || 'No Title'}</p>
              <Progress percent={percent} strokeWidth={3} />
              <p className="number">
                <CountUp
                  start={0}
                  end={number}
                  duration={2.75}
                  useEasing
                  useGrouping
                  separator=","
                  {...countUp || {}}
                />
                {withPercent ? '%' : ''}
              </p>
            </div>
          </div>
        </Tooltip>
      </Card>
    );
  }
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
  percent: PropTypes.number,
  withPercent: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func
};

export default NumberCard;
