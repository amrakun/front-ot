import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, Card, Button, Icon } from 'antd';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';
import { Search } from 'modules/common/components';
import { Paginator } from 'modules/common/components';
import { labels } from './constants';

class FeedbackResponses extends React.Component {
  constructor(props) {
    super(props);

    this.renderExpandedRow = this.renderExpandedRow.bind(this);
  }

  componentDidUpdate() {
    const { loading } = this.props;
    const data = this.props.data || [];

    if (!loading && data.length > 0) {
      const lastFeedbackId = data[0]._id;
      localStorage.setItem('lastFeedbackId', lastFeedbackId);
    }
  }

  extraColumns() {
    return [
      {
        title: labels.corporateSocial,
        dataIndex: 'corporateSocial'
      },
      {
        title: labels.otherStories,
        dataIndex: 'otherStories'
      }
    ];
  }

  columns() {
    return [
      {
        title: 'Feedback Status',
        dataIndex: 'feedback.status'
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
        title: 'Status',
        dataIndex: 'status'
      },
      {
        title: 'Supplier',
        dataIndex: 'supplier.basicInfo.enName'
      },
      {
        title: labels.totalEmploymentOt,
        dataIndex: 'totalEmploymentOt'
      },
      {
        title: labels.totalEmploymentUmnugobi,
        dataIndex: 'totalEmploymentUmnugobi'
      },
      {
        title: labels.employmentChangesAfter,
        dataIndex: 'employmentChangesAfter'
      },
      {
        title: labels.numberOfEmployeeWorkToScopeNational,
        dataIndex: 'numberOfEmployeeWorkToScopeNational'
      },
      {
        title: labels.numberOfEmployeeWorkToScopeUmnugobi,
        dataIndex: 'totalEmploymenumberOfEmployeeWorkToScopeUmnugobintOt'
      },
      {
        title: labels.procurementTotalSpend,
        dataIndex: 'procurementTotalSpend'
      },
      {
        title: labels.procurementNationalSpend,
        dataIndex: 'procurementNationalSpend'
      },
      {
        title: labels.procurementUmnugobiSpend,
        dataIndex: 'procurementUmnugobiSpend'
      },
      {
        title: 'Contact person',
        dataIndex: 'supplier.contactInfo.name'
      },
      {
        title: 'Email',
        dataIndex: 'supplier.contactInfo.email'
      },
      {
        title: 'Phone',
        dataIndex: 'supplier.contactInfo.phone'
      }
    ];
  }

  renderExpandedRow(record) {
    return (
      <Table
        columns={this.extraColumns()}
        dataSource={[record]}
        rowKey={() => Math.random()}
        pagination={false}
      />
    );
  }

  getDiscretedRows() {
    const data = this.props.data || [];
    const lastFeedbackId = localStorage.getItem('lastFeedbackId');
    let updatedData = [];
    let isLastFeedbackReached = false;

    data.forEach(record => {
      if (record && record._id !== lastFeedbackId && !isLastFeedbackReached) {
        updatedData.push({
          ...record,
          className: 'highlight'
        });
      } else {
        isLastFeedbackReached = false;
        updatedData.push(record);
      }
    });

    return updatedData;
  }

  render() {
    const { loading, onChange, exportResponses } = this.props;

    return (
      <Card title="Success feedback responses">
        <div className="table-operations">
          <Search placeholder="Supplier name" />
          <Button onClick={exportResponses}>
            Export to excel <Icon type="file-excel" />
          </Button>
        </div>
        <Table
          columns={this.columns()}
          rowKey={record => record._id}
          rowClassName={record => record.className}
          dataSource={this.getDiscretedRows()}
          pagination={false}
          loading={loading}
          scroll={{ x: 2000 }}
          expandedRowRender={this.renderExpandedRow}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />
        <Paginator total={10} />
      </Card>
    );
  }
}

FeedbackResponses.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  exportResponses: PropTypes.func
};

export default withRouter(FeedbackResponses);
