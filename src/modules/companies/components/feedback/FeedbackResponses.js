import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';

class FeedbackResponses extends React.Component {
  constructor(props) {
    super(props);
  }

  columns() {
    return [
      {
        title: 'Status',
        dataIndex: 'status'
      },
      {
        title: 'Open date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Close date',
        render: record => moment(record.closeDate).format(dateFormat)
      },
      {
        title: 'Suppliers',
        render: record => (record.supplierIds ? record.supplierIds.length : '-')
      },
      {
        title: 'Action',
        render: record => (
          <Link to={`/feedback/response/${record._id}`}>View</Link>
        )
      }
    ];
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;

    console.log(data);

    return (
      <Card title="Success feedback responses">
        <Table
          columns={this.columns()}
          rowKey={record => record._id}
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

FeedbackResponses.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

export default withRouter(FeedbackResponses);
