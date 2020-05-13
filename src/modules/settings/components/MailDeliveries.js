import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Card, Row, Col, Input, Modal } from 'antd';
import { dateTimeFormat } from 'modules/common/constants';
import router from 'modules/common/router';
import { Paginator } from 'modules/common/components';

const propTypes = {
  deliveries: PropTypes.array,
};

class MailDeliveries extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Num',
        key: '_id',
        render: (value, row, index) => <span>{index + 1}</span>,
      },
      {
        title: 'Created date',
        dataIndex: 'createdDate',
        render: createdDate => {
          return moment(createdDate).format(dateTimeFormat);
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'From',
        dataIndex: 'from',
        key: 'from',
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
      },
      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
      },
    ];

    this.state = {
      search: props.search,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ search: e.target.value });
  }

  handleSearch(e) {
    router.setParams(this.props.history, { search: this.state.search });
  }

  renderModal() {
    const { showModal, currentRecord } = this.state;

    if (!showModal || !currentRecord) {
      return null;
    }

    const cancel = () => this.setState({ showModal: false });

    return (
      <Modal title="To emails" visible={true} onCancel={cancel} onOk={cancel}>
        {currentRecord.to.split(',').map(to => {
          return <p key={to}>{to}</p>;
        })}
      </Modal>
    );
  }

  render() {
    const { search } = this.state;
    const { deliveries, totalCount } = this.props;

    return (
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Mail deliveries">
            <div className="table-operations">
              <Input
                value={search}
                placeholder="Search ..."
                onPressEnter={this.handleSearch}
                onChange={this.onChange}
                ref={node => (this.searchInput = node)}
              />
            </div>

            <Table
              onRow={record => {
                return {
                  onClick: () => {
                    this.setState({ showModal: true, currentRecord: record });
                  },
                };
              }}
              columns={this.columns}
              rowKey={record => record._id}
              dataSource={deliveries}
              pagination={false}
              scroll={{ x: 1224 }}
            />

            <Paginator total={totalCount} />

            {this.renderModal()}
          </Card>
        </Col>
      </Row>
    );
  }
}

MailDeliveries.propTypes = propTypes;

export default MailDeliveries;
