import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, Card, Input, Icon, Row, Col, Button, message } from 'antd';
import { columns } from 'modules/companies/constants';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/colors';

const Search = Input.Search;

const propTypes = {
  data: PropTypes.array,
  tenderDetail: PropTypes.object,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  filter: PropTypes.func,
  award: PropTypes.func,
  bidSummaryReport: PropTypes.func,
  sendRegretLetter: PropTypes.func
};

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
      message.error('Please select atleast one supplier!');
    } else {
      this.props.award(selectedCompanies[0]);
    }
  }

  render() {
    const { data, pagination, loading, onChange, tenderDetail } = this.props;
    const { selectedCompanies } = this.state;

    return (
      <div>
        <Row gutter={24}>
          <Col key={2} lg={6} sm={12}>
            <NumberCard
              icon="message"
              title="Requested"
              color={colors[3]}
              number={30}
            />
          </Col>
          <Col key={2} lg={6} sm={12}>
            <NumberCardLines
              icon="like-o"
              title="Submitted"
              color={colors[2]}
              number={15}
              percent={50}
            />
          </Col>
          <Col key={2} lg={6} sm={12}>
            <NumberCardLines
              icon="dislike-o"
              title="Not intereseted"
              color={colors[4]}
              number={7}
              percent={24}
            />
          </Col>
          <Col key={2} lg={6} sm={12}>
            <NumberCardLines
              icon="question"
              title="Not responded"
              color={colors[5]}
              number={8}
              percent={26}
            />
          </Col>
        </Row>
        <Card
          bordered={true}
          title={`Submitted companies for "${
            tenderDetail ? tenderDetail.name : ''
          }"`}
        >
          <div className="table-operations">
            <Search
              placeholder="Supplier name or SAP number"
              style={{ width: 200, float: 'left' }}
              onSearch={value => console.log(value)}
            />
            <Button onClick={this.bidSummaryReport}>
              <Icon type="file-excel" />
              Bid summary report
            </Button>
            <Button onClick={this.sendRegretLetter}>
              <Icon type="mail" />
              Send regret letter
            </Button>
            <Button type="primary" onClick={this.award}>
              <Icon type="trophy" />
              Award
            </Button>
          </div>

          <Table
            rowSelection={{
              selectedCompanies,
              onChange: this.onSelectedCompaniesChange
            }}
            columns={columns}
            rowKey={record => record._id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            scroll={{ x: 1600 }}
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
