/* eslint-disable react/display-name */

import { gql, withApollo } from 'react-apollo';
import moment from 'moment';
import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import { Modal, Table, Card, Row, Col, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NumberCard, TextCard } from 'modules/common/components';
import { dateFormat, colors } from 'modules/common/constants';
import { readFileUrl } from 'modules/common/utils';
import router from 'modules/common/router';
import { Search } from 'modules/common/components';
import { StatsTable } from 'modules/common/components';
import { auditTabs } from 'modules/qualification/consts';
import { MassEmail } from 'modules/companies/containers';
import { queries } from '../../graphql';

class AuditResponses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      selectedSuppliers: [],
      showModal: false,
      modalTitle: '',
      popupData: []
    };

    this.columns = this.columns.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  handleDateRangeChange(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.from = value[0] ? value[0]._d : null;
    query.to = value[1] ? value[1]._d : null;

    history.push({
      search: queryString.stringify(query)
    });
  }

  onSelectChange(selectedRowKeys, selectedRows) {
    this.setState({
      selectedRowKeys,
      selectedSuppliers: selectedRows.map(row => row.supplier)
    });
  }

  setFilter(name) {
    router.setParams(this.props.history, {
      isQualified: undefined,
      isNew: undefined,
      isSentImprovementPlan: undefined,
      [name]: true
    });
  }

  showCompanies(type) {
    const { client } = this.props;

    client
      .query({
        query: gql(queries.auditsSuppliers),
        variables: { type }
      })
      .then(({ data, loading }) => {
        if (loading) {
          return;
        }

        this.setState({
          showModal: true,
          modalTitle: `${
            type === 'notResponded' ? 'Not responded' : 'Invited'
          } suppliers`,
          popupData: data.auditsSuppliers
        });
      });
  }

  renderModal() {
    const { showModal, modalTitle, popupData } = this.state;

    if (!showModal) {
      return false;
    }

    const columns = [
      { title: 'Status', dataIndex: 'audit.status', width: 160 },
      {
        title: 'Publish date',
        render: record => moment(record.audit.publishDate).format(dateFormat)
      },
      {
        title: 'Close date',
        render: record => moment(record.audit.closeDate).format(dateFormat)
      },
      {
        title: 'Supplier name',
        dataIndex: 'supplier.basicInfo.enName',
        width: 160
      },
      {
        title: 'Vendor number',
        dataIndex: 'supplier.basicInfo.sapNumber',
        width: 100
      },
      {
        title: 'Tier type',
        dataIndex: 'supplier.tierTypeDisplay',
        width: 40
      },
      {
        title: 'Contact person',
        dataIndex: 'supplier.contactInfo.name',
        width: 60
      },
      {
        title: 'Email address',
        dataIndex: 'supplier.contactInfo.email',
        width: 60
      },
      {
        title: 'Phone number',
        dataIndex: 'supplier.contactInfo.phone',
        width: 60
      }
    ];

    const props = {
      dataSource: popupData,
      columns,
      key: Math.random()
    };

    return (
      <Modal
        title={modalTitle}
        visible={true}
        footer={null}
        width="80%"
        onCancel={() => this.setState({ showModal: false })}
      >
        <Table {...props} />
      </Modal>
    );
  }

  columns() {
    return [
      {
        title: 'Status by date',
        render: record => (record.status === 'onTime' ? 'On time' : 'Late')
      },
      { title: 'Status by action', dataIndex: 'audit.status' },
      { title: 'Supplier name', dataIndex: 'supplier.basicInfo.enName' },
      { title: 'Vendor number', dataIndex: 'supplier.basicInfo.sapNumber' },
      {
        title: 'Publish date',
        render: record => moment(record.audit.publishDate).format(dateFormat)
      },
      {
        title: 'Close date',
        render: record => moment(record.audit.closeDate).format(dateFormat)
      },
      {
        title: 'Submission date',
        render: record => moment(record.createdDate).format(dateFormat)
      },
      {
        title: 'Submitted count',
        render: record => record.submittedCount
      },
      {
        title: 'Provided information',
        render: record =>
          record.supplier ? (
            <Link
              to={{
                pathname: '/audit/qualify',
                state: {
                  supplierId: record.supplier._id,
                  auditId: record.audit._id
                }
              }}
            >
              View
            </Link>
          ) : (
            '-'
          )
      },
      {
        title: 'Last auditor report',
        render: record => {
          if (!record.reportFile) {
            return '-';
          }

          return (
            <a href={readFileUrl(record.reportFile)} target="_blank">
              file
            </a>
          );
        }
      },
      {
        title: 'Last auditor improvement plan',
        render: record => {
          if (!record.improvementPlanFile) {
            return '-';
          }

          return (
            <a href={readFileUrl(record.improvementPlanFile)} target="_blank">
              file
            </a>
          );
        }
      }
    ];
  }

  render() {
    const { loading } = this.props;
    const counts = this.props.counts || {};
    const data = this.props.data || [];

    const statsQuery = this.props.responsesQualifiedStatusQuery || {};
    const auditStats = statsQuery.auditResponsesQualifiedStatus || {};

    const { selectedRowKeys, selectedSuppliers } = this.state;

    const colSpan = {
      xl: 8,
      lg: 12,
      sm: 24
    };

    return (
      <div>
        {this.renderModal()}
        <Row gutter={24}>
          <Col key={0} {...colSpan}>
            <NumberCard
              icon="message"
              title="Invited suppliers"
              color={colors[3]}
              number={counts.invited || 0}
              onClick={() => this.showCompanies('invited')}
            />
          </Col>
          <Col key={1} {...colSpan}>
            <TextCard
              icon="like"
              title={`Qualified - ${counts.qualified || 0}`}
              color={colors[2]}
              size="big"
              text={<StatsTable stats={auditStats} tabs={auditTabs} />}
              onClick={() => this.setFilter('isQualified')}
            />
          </Col>
          <Col key={2} {...colSpan}>
            <NumberCard
              icon="question"
              title="Not responded"
              color={colors[5]}
              number={counts.notResponded || 0}
              onClick={() => this.showCompanies('notResponded')}
            />
          </Col>
          <Col key={3} {...colSpan}>
            <NumberCard
              icon="calculator"
              title="New"
              color={colors[6]}
              number={counts.notNotified || 0}
              onClick={() => this.setFilter('isNew')}
            />
          </Col>
          <Col key={4} {...colSpan}>
            <NumberCard
              icon="mail"
              title="Sent improvement plan"
              color={colors[8]}
              number={counts.sentImprovementPlan || 0}
              onClick={() => this.setFilter('isSentImprovementPlan')}
            />
          </Col>
        </Row>

        <Card title="Desktop audit responses">
          <div className="table-operations">
            <Search />

            <MassEmail suppliers={selectedSuppliers} />

            <DatePicker.RangePicker
              onChange={this.handleDateRangeChange}
              allowClear
            />
          </div>
          <Table
            columns={this.columns()}
            rowKey={record => record._id}
            dataSource={data}
            loading={loading}
            scroll={{ x: 1400 }}
            rowSelection={{
              selectedRowKeys,
              onChange: this.onSelectChange
            }}
            rowClassName={record => {
              if (record.isQualified) return 'highlight';
            }}
          />
        </Card>
      </div>
    );
  }
}

AuditResponses.propTypes = {
  client: PropTypes.object,
  pagination: PropTypes.object,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  counts: PropTypes.object,
  responsesQualifiedStatusQuery: PropTypes.object
};

export default withRouter(withApollo(AuditResponses));
