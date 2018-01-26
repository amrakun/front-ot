import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, Card, Button, Icon } from 'antd';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';

class FeedbackResponses extends React.Component {
  constructor(props) {
    super(props);

    this.renderExpandedRow = this.renderExpandedRow.bind(this);
  }

  extraColumns() {
    return [
      {
        title: 'Investment',
        dataIndex: 'investment'
      },
      {
        title: 'Trainings',
        dataIndex: 'trainings'
      },
      {
        title: 'Corporate social responsibility',
        dataIndex: 'corporateSocial'
      },
      {
        title: 'Technoloogy Improvements',
        dataIndex: 'technologyImprovement'
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
        title: 'Employment before',
        dataIndex: 'employmentNumberBefore'
      },
      {
        title: 'Employment now',
        dataIndex: 'employmentNumberNow'
      },
      {
        title: 'National spend before',
        dataIndex: 'nationalSpendBefore'
      },
      {
        title: 'National spend after',
        dataIndex: 'nationalSpendAfter'
      },
      {
        title: 'Umnugobi spend before',
        dataIndex: 'umnugobiSpendBefore'
      },
      {
        title: 'Umnugobi spend after',
        dataIndex: 'umnugobiSpendAfter'
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

  render() {
    const { pagination, loading, onChange } = this.props;
    const data = this.props.data || [];

    return (
      <Card title="Success feedback responses">
        <div className="table-operations">
          <Button disabled>
            Export to excel <Icon type="file-excel" />
          </Button>
        </div>
        <Table
          columns={this.columns()}
          rowKey={record => record._id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          scroll={{ x: 2000 }}
          expandedRowRender={this.renderExpandedRow}
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
