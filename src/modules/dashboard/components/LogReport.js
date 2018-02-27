import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button, Icon, DatePicker } from 'antd';

import { dateFormat } from 'modules/common/constants';

const RangePicker = DatePicker.RangePicker;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.exportActivitiesPerBuyer = this.exportActivitiesPerBuyer.bind(this);
    this.exportUserLastLogins = this.exportUserLastLogins.bind(this);
  }

  onInputChange(name, value) {
    this[name] = value;
  }

  exportActivitiesPerBuyer() {
    this.props.export(
      'logsActivitiesPerBuyerExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  exportUserLastLogins() {
    this.props.export(
      'logsUserLastLoginsExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  getDateInterval(date) {
    return {
      startDate: date[0],
      endDate: date[1]
    };
  }

  renderButton(onClick) {
    return (
      <Button onClick={onClick} className="report-btn">
        <Icon type="file-excel" />Export report
      </Button>
    );
  }

  render() {
    const span = {
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24
    };

    return (
      <Row gutter={24}>
        <Col {...span}>
          <Card title="Activities per buyer">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.exportActivitiesPerBuyer)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="User last logins">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.exportUserLastLogins)}
          </Card>
        </Col>
      </Row>
    );
  }
}

Dashboard.propTypes = {
  export: PropTypes.func
};

export default Dashboard;
