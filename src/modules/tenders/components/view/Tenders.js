import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card, Popconfirm, Input, DatePicker } from 'antd';
import { tenderColumns, supplierTenderColumns, labels } from '../../constants';
import { dateFormat } from 'modules/common/constants';
import queryString from 'query-string';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;

class Tenders extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);

    const searchQuery = query.search;
    let dateRange = [];
    if (query.from) dateRange = [moment(query.from), moment(query.to)];

    this.state = {
      search: searchQuery || '',
      dateRange: dateRange
    };

    this.renderOperation = this.renderOperation.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.search = value;

    history.push({
      search: queryString.stringify(query)
    });
  }

  handleDateRangeChange(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.from = value[0]._d;
    query.to = value[1]._d;

    history.push({
      search: queryString.stringify(query)
    });
  }

  renderOperation(_id) {
    const { currentUser, notInterested } = this.props;

    if (currentUser) {
      if (currentUser.isSupplier) {
        return (
          <div style={{ width: '160px' }}>
            <Link to={`/tender/submit/${_id}`}>More</Link>
            <span className="ant-divider" />
            <Popconfirm
              title="Are you sure you are not interested？"
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => notInterested(_id)}
            >
              <a>Not interested</a>
            </Popconfirm>
          </div>
        );
      } else {
        return (
          <div>
            <Link to={`/tender/${_id}`}>View</Link>
            <span className="ant-divider" />
            <Link to={`/tender/edit/${_id}`}>Edit</Link>
          </div>
        );
      }
    } else {
      return (
        <div style={{ width: '160px' }}>
          <Link to={`/sign-in?required`}>More</Link>
        </div>
      );
    }
  }

  render() {
    const {
      currentUser,
      type,
      data,
      pagination,
      loading,
      onChange,
      history
    } = this.props;
    const { search, dateRange } = this.state;

    let columns = supplierTenderColumns;
    if (currentUser && !currentUser.isSupplier) columns = tenderColumns;

    columns[columns.length - 1].render = record =>
      this.renderOperation(record._id);

    return (
      <Card style={{ marginBottom: '16px' }} title={labels[type]}>
        {history.location.pathname !== '/dashboard' && (
          <div className="table-operations">
            <Search
              defaultValue={search}
              placeholder="Name or number"
              style={{ width: 200, float: 'left' }}
              onSearch={this.handleSearch}
            />

            <RangePicker
              defaultValue={dateRange}
              format={dateFormat}
              placeholder={['From', 'To']}
              onChange={this.handleDateRangeChange}
              allowClear
            />
          </div>
        )}
        <Table
          columns={columns}
          rowKey={record => record._id}
          rowClassName={record => {
            if (record.isAwarded) return 'highlight';
          }}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />
      </Card>
    );
  }
}

Tenders.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  currentUser: PropTypes.object,
  notInterested: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(Tenders);
