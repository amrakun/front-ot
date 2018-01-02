import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, Card, Input, Icon, Row, Col, Button, message } from 'antd';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/colors';

const Search = Input.Search;

const columns = [
  { title: 'Status', dataIndex: 'status', key: 0 },
  { title: 'Supplier name', dataIndex: 'supplier.basicInfo.enName', key: 1 },
  { title: 'SAP #', dataIndex: 'supplier.basicInfo.sapNumber', key: 2 },
  { title: 'Company size', dataIndex: 'size', key: 3 },
  {
    title: 'Number of employees',
    dataIndex: 'supplier.basicInfo.totalNumberOfEmployees',
    key: 4
  },
  { title: 'Work experience', dataIndex: 'status', key: 5 },
  { title: 'Supplier tier type', dataIndex: 'status', key: 6 },
  {
    title: 'Response information',
    key: 17,
    render: render
  },
  { title: 'Uploaded file', dataIndex: 'status', key: 7 },
  { title: 'Contact person', dataIndex: 'supplier.contactInfo.name', key: 8 },
  { title: 'Email', dataIndex: 'supplier.contactInfo.email', key: 9 },
  { title: 'Phone', dataIndex: 'supplier.contactInfo.phone', key: 10 },
  { title: 'Registration', dataIndex: 'registration', key: 11 },
  { title: 'Pre-qualification', dataIndex: 'prequalification', key: 12 },
  { title: 'Qualification/audit status', dataIndex: 'audit', key: 13 },
  { title: 'Validation status', dataIndex: 'validation', key: 14 },
  { title: 'Due dilligence', dataIndex: 'dilligence', key: 15 },
  { title: 'DIFOT score', dataIndex: 'dipotScore', key: 16 }
];

const propTypes = {
  data: PropTypes.object,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  filter: PropTypes.func,
  award: PropTypes.func,
  bidSummaryReport: PropTypes.func,
  sendRegretLetter: PropTypes.func
};

function render(text, record) {
  console.log(record);
  return <a>View</a>;
}

class Tender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCompanies: []
    };

    this.onSelectedCompaniesChange = this.onSelectedCompaniesChange.bind(this);
    this.bidSummaryReport = this.bidSummaryReport.bind(this);
    this.sendRegretLetter = this.sendRegretLetter.bind(this);
    this.award = this.award.bind(this);
  }

  onSelectedCompaniesChange(selectedCompanies) {
    this.setState({ selectedCompanies });
  }

  bidSummaryReport() {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier!')
      : this.props.bidSummaryReport(this.state.selectedCompanies);
  }

  sendRegretLetter() {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier!')
      : this.props.sendRegretLetter(this.state.selectedCompanies);
  }

  award() {
    const { selectedCompanies } = this.state;

    if (selectedCompanies.length > 1) {
      message.error('Please select only one supplier to award!');
    } else if (selectedCompanies.length < 1) {
      message.error('Please select a supplier!');
    } else {
      this.props.award(selectedCompanies[0]);
    }
  }

  getPercent(requestedCount, count) {
    if (count) return count / requestedCount * 100;
    else return 0;
  }

  render() {
    const { pagination, loading, onChange } = this.props;
    const { selectedCompanies } = this.state;
    const data = this.props.data || {};
    const {
      type,
      submittedCount,
      requestedCount,
      notInterestedCount,
      notRespondedCount,
      isAwarded,
      winnerId
    } = data;

    return (
      <div>
        <Row gutter={24}>
          <Col key={1} lg={6} sm={12}>
            <NumberCard
              icon="message"
              title="Requested"
              color={colors[3]}
              number={requestedCount}
            />
          </Col>
          <Col key={2} lg={6} sm={12}>
            <NumberCardLines
              icon="like-o"
              title="Submitted"
              color={colors[2]}
              number={submittedCount}
              percent={this.getPercent(requestedCount, submittedCount)}
            />
          </Col>
          <Col key={3} lg={6} sm={12}>
            <NumberCardLines
              icon="dislike-o"
              title="Not intereseted"
              color={colors[4]}
              number={notInterestedCount}
              percent={this.getPercent(requestedCount, notInterestedCount)}
            />
          </Col>
          <Col key={4} lg={6} sm={12}>
            <NumberCardLines
              icon="question"
              title="Not responded"
              color={colors[5]}
              number={notRespondedCount}
              percent={this.getPercent(requestedCount, notRespondedCount)}
            />
          </Col>
        </Row>
        <Card
          bordered={true}
          title={
            <div>
              Submitted companies for <strong>{data.name}</strong>
            </div>
          }
        >
          <div className="table-operations">
            <Search
              placeholder="Supplier name or SAP number"
              style={{ width: 200, float: 'left' }}
              onSearch={value => console.log(value)}
            />
            <Button disabled onClick={this.bidSummaryReport}>
              <Icon type="file-excel" />
              Bid summary report
            </Button>
            <Button disabled onClick={this.sendRegretLetter}>
              <Icon type="mail" />
              Send regret letter
            </Button>
            {type === 'rfq' ? (
              <Button type="primary" onClick={this.award} disabled={isAwarded}>
                <Icon type="trophy" />
                Award
              </Button>
            ) : (
              <Button type="primary" onClick={this.award} disabled>
                <Icon type="file-excel" />
                EOI short list
              </Button>
            )}
          </div>

          <Table
            rowSelection={{
              selectedCompanies,
              onChange: this.onSelectedCompaniesChange
            }}
            rowClassName={record => {
              if (record._id === winnerId) return 'highlight';
            }}
            columns={columns}
            rowKey={record => {
              return record._id + Math.random();
            }}
            dataSource={data.responses}
            pagination={pagination}
            loading={loading}
            scroll={{ x: 2000 }}
            onChange={(pagination, filters, sorter) =>
              onChange(pagination, filters, sorter)
            }
          />
        </Card>
      </div>
    );
  }
}

Tender.propTypes = propTypes;

export default withRouter(Tender);
