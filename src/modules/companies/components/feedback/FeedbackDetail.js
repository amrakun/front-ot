import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col } from 'antd';
import { NumberCard } from 'modules/common/components';
import { colors } from 'modules/common/colors';

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
        title: 'Status',
        dataIndex: 'status'
      },
      {
        title: 'Supplier',
        dataIndex: 'supplier'
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
        dataIndex: 'contact'
      },
      {
        title: 'Email',
        dataIndex: 'email'
      },
      {
        title: 'Phone',
        dataIndex: 'phone'
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

    const data = this.props.data || {};
    const requested = data.supplierIds ? data.supplierIds.length : 0;
    const submitted = data.responses ? data.responses.length : 0;
    const notResponded = requested - submitted;

    return (
      <div>
        <Row gutter={24}>
          <Col key={0} lg={8} sm={12}>
            <NumberCard
              icon="message"
              title="Requested"
              color={colors[3]}
              number={requested}
            />
          </Col>
          <Col key={1} lg={8} sm={12}>
            <NumberCard
              icon="like"
              title="Submitted"
              color={colors[2]}
              number={submitted}
            />
          </Col>
          <Col key={2} lg={8} sm={12}>
            <NumberCard
              icon="question"
              title="Not responded"
              color={colors[5]}
              number={notResponded}
            />
          </Col>
        </Row>

        <Card title="Success feedback responses">
          <Table
            columns={this.columns()}
            rowKey={record => record._id}
            dataSource={data.responses}
            pagination={pagination}
            loading={loading}
            scroll={{ x: 1500 }}
            expandedRowRender={this.renderExpandedRow}
            onChange={(pagination, filters, sorter) =>
              onChange(pagination, filters, sorter)
            }
          />
        </Card>
      </div>
    );
  }
}

FeedbackResponses.propTypes = {
  data: PropTypes.object,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

export default withRouter(FeedbackResponses);
