import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Card, Row, Col, Input } from 'antd';
import { dateFormat } from 'modules/common/constants';
import router from 'modules/common/router';
import { Paginator } from 'modules/common/components';

const propTypes = {
  deliveries: PropTypes.array
};

class MailDeliveries extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Num',
        key: '_id',
        render: (value, row, index) => <span>{index + 1}</span>
      },
      {
        title: 'Created date',
        dataIndex: 'createdDate',
        render: createdDate => {
          return moment(createdDate).format(dateFormat);
        }
      },
      {
        title: 'From',
        dataIndex: 'from',
        key: 'from'
      },
      {
        title: 'To',
        dataIndex: 'to',
        key: 'to'
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
      }
    ];

    this.state = {
      search: props.search
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
              columns={this.columns}
              rowKey={record => record._id}
              dataSource={deliveries}
            />

            <Paginator total={totalCount} />
          </Card>
        </Col>
      </Row>
    );
  }
}

MailDeliveries.propTypes = propTypes;

export default MailDeliveries;
