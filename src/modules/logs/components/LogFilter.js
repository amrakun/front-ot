import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Select, Row, Col, Button } from 'antd';
import moment from 'moment';

import { dateTimeFormat } from 'modules/common/constants';

const LOG_TYPES = {
  TENDER: 'tender',
  TENDER_MESSAGE: 'composeMessage',
  TENDER_RESPONSE: 'tenderResponse',
  BLOCKED_COMPANY: 'blockedCompany',
  COMPANY: 'company',
  QUALIFICATION: 'qualification',
  USER: 'user',
};

export default class LogFilter extends React.Component {
  constructor() {
    super();

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onDatesChange(dates) {
    let startDate;
    let endDate;

    this.setState({
      startDate: dates[0],
      endDate: dates[1],
    });

    if (dates[0]) {
      startDate = moment(dates[0]).format(dateTimeFormat);
    }
    if (dates[1]) {
      endDate = moment(dates[1]).format(dateTimeFormat);
    }

    this.props.onFilterChange({ name: 'start', value: startDate });
    this.props.onFilterChange({ name: 'end', value: endDate });
  }

  onSelectChange(value, name) {
    this.setState({ [name]: value });

    this.props.onFilterChange({ name, value });
  }

  render() {
    const { filter, users, search } = this.props;
    const { start, end, action, userId, type } = filter;
    const userOptions = users.map(user => {
      return (
        <Select.Option key={user._id} value={user._id}>
          {user.username}
        </Select.Option>
      );
    });
    const LOG_ACTION_OPTIONS = [
      <Select.Option key="all" value="">
        All
      </Select.Option>,
      <Select.Option key="create" value="create">
        Create
      </Select.Option>,
      <Select.Option key="update" value="update">
        Update
      </Select.Option>,
      <Select.Option key="Delete" value="delete">
        Delete
      </Select.Option>,
    ];

    const LOG_TYPE_OPTIONS = [
      <Select.Option key="all" value="">
        All
      </Select.Option>,
      <Select.Option key={LOG_TYPES.BLOCKED_COMPANY} value={LOG_TYPES.BLOCKED_COMPANY}>
        Blocked company
      </Select.Option>,
      <Select.Option key={LOG_TYPES.COMPANY} value={LOG_TYPES.COMPANY}>
        Company
      </Select.Option>,
      <Select.Option key={LOG_TYPES.QUALIFICATION} value={LOG_TYPES.QUALIFICATION}>
        Qualification
      </Select.Option>,
      <Select.Option key={LOG_TYPES.TENDER} value={LOG_TYPES.TENDER}>
        Tender
      </Select.Option>,
      <Select.Option key={LOG_TYPES.TENDER_MESSAGE} value={LOG_TYPES.TENDER_MESSAGE}>
        Tender compose message
      </Select.Option>,
      <Select.Option key={LOG_TYPES.TENDER_RESPONSE} value={LOG_TYPES.TENDER_RESPONSE}>
        Tender response
      </Select.Option>,
      <Select.Option key={LOG_TYPES.USER} value={LOG_TYPES.USER}>
        User
      </Select.Option>,
    ];

    const gutter = { xs: 8, sm: 16, md: 24, lg: 32 };
    const selectStyle = { width: 200 };
    const dates = [];

    if (start) {
      dates.push(moment(start));
    }
    if (end) {
      dates.push(moment(end));
    }

    return (
      <Row gutter={gutter}>
        <Col span="6">
          <DatePicker.RangePicker
            value={dates}
            onChange={this.onDatesChange}
            format={dateTimeFormat}
            placeholder={['Choose start date', 'Choose end date']}
          />
        </Col>
        <Col span="5">
          <Select
            placeholder="Choose action"
            onChange={val => this.onSelectChange(val, 'action')}
            value={action}
            defaultValue=""
            style={selectStyle}
            allowClear={true}
          >
            {LOG_ACTION_OPTIONS}
          </Select>
        </Col>
        <Col span="5">
          <Select
            placeholder="Choose module"
            onChange={val => this.onSelectChange(val, 'type')}
            value={type}
            defaultValue=""
            style={selectStyle}
            allowClear={true}
          >
            {LOG_TYPE_OPTIONS}
          </Select>
        </Col>
        <Col span="5">
          <Select
            placeholder="Choose user"
            onChange={val => this.onSelectChange(val, 'userId')}
            value={userId}
            defaultValue=""
            style={selectStyle}
            allowClear={true}
          >
            {userOptions}
          </Select>
        </Col>
        <Col>
          <Button type="primary" icon="search" onClick={search}>
            Search
          </Button>
        </Col>
      </Row>
    );
  }
}

LogFilter.propTypes = {
  filter: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  users: PropTypes.array,
  search: PropTypes.func.isRequired,
};
