import React from 'react';
import PropTypes from 'prop-types';
import { Table, Card, Input, Icon, Row, Col, Button, Modal } from 'antd';
import { NumberCard, NumberCardLines } from 'modules/common/components';
import { colors } from 'modules/common/colors';

const Search = Input.Search;

const propTypes = {
  data: PropTypes.object,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  filter: PropTypes.func,
  sendRegretLetter: PropTypes.func
};

class Tender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCompanies: [],
      responseModalData: { visible: false }
    };

    this.onSelectedCompaniesChange = this.onSelectedCompaniesChange.bind(this);
    this.showResponsesModal = this.showResponsesModal.bind(this);
    this.hideResponsesModal = this.hideResponsesModal.bind(this);
    this.renderViewResponse = this.renderViewResponse.bind(this);
  }

  onSelectedCompaniesChange(selectedCompanies) {
    this.setState({ selectedCompanies });
  }

  getPercent(requestedCount, count) {
    if (count) return count / requestedCount * 100;
    else return 0;
  }

  showResponsesModal(record) {
    const { supplier, response } = record;

    this.setState({
      responseModalData: {
        visible: true,
        title: supplier ? supplier.basicInfo.enName : '',
        data:
          response.respondedDocuments.length > 0
            ? response.respondedDocuments
            : response.respondedProducts
      }
    });
  }

  hideResponsesModal() {
    this.setState({ responseModalData: { visible: false } });
  }

  columns() {
    return [
      {
        title: 'Supplier name',
        dataIndex: 'supplier.basicInfo.enName',
        key: 1
      },
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
        render: this.renderViewResponse
      },
      { title: 'Uploaded file', dataIndex: 'status', key: 7 },
      {
        title: 'Contact person',
        dataIndex: 'supplier.contactInfo.name',
        key: 8
      },
      { title: 'Email', dataIndex: 'supplier.contactInfo.email', key: 9 },
      { title: 'Phone', dataIndex: 'supplier.contactInfo.phone', key: 10 },
      { title: 'Registration', dataIndex: 'registration', key: 11 },
      { title: 'Pre-qualification', dataIndex: 'prequalification', key: 12 },
      { title: 'Qualification/audit status', dataIndex: 'audit', key: 13 },
      { title: 'Validation status', dataIndex: 'validation', key: 14 },
      { title: 'Due dilligence', dataIndex: 'dilligence', key: 15 },
      { title: 'DIFOT score', dataIndex: 'dipotScore', key: 16 }
    ];
  }

  renderViewResponse(text, record) {
    return <a onClick={() => this.showResponsesModal(record)}>View</a>;
  }

  renderTender(args) {
    const {
      requestColumns,
      responseColumns,
      requestedData,
      tableOperations
    } = args;
    const { pagination, loading, onChange } = this.props;
    const { selectedCompanies, responseModalData } = this.state;
    const data = this.props.data || {};
    const {
      submittedCount,
      requestedCount,
      notInterestedCount,
      notRespondedCount,
      winnerId,
      responses
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
            <Button
              onClick={() =>
                this.props.sendRegretLetter(this.state.selectedCompanies)
              }
            >
              Send regret letter
              <Icon type="mail" />
            </Button>
            {tableOperations}
          </div>

          <Table
            rowSelection={{
              selectedCompanies,
              onChange: this.onSelectedCompaniesChange
            }}
            rowClassName={record => {
              if (record.supplier._id === winnerId) return 'highlight';
            }}
            columns={this.columns()}
            rowKey={record => (record.supplier ? record.supplier._id : '')}
            dataSource={responses}
            pagination={pagination}
            loading={loading}
            scroll={{ x: 2500 }}
            onChange={(pagination, filters, sorter) =>
              onChange(pagination, filters, sorter)
            }
          />
        </Card>

        <Modal
          title={`${responseModalData.title}'s response`}
          visible={responseModalData.visible}
          onCancel={this.hideResponsesModal}
          footer={null}
          width="100%"
          style={{ top: 16 }}
        >
          <Row gutter={16}>
            {requestedData && (
              <Col span={8}>
                <Table
                  columns={requestColumns}
                  rowKey={() => Math.random()}
                  dataSource={requestedData}
                  scroll={{ x: 1100 }}
                />
              </Col>
            )}

            <Col span={requestedData ? 16 : 24}>
              <Table
                columns={responseColumns}
                rowKey={() => Math.random()}
                dataSource={responseModalData.data}
                scroll={{ x: 1300 }}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

Tender.propTypes = propTypes;

export default Tender;
