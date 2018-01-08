import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, Card, Row, Col, Button, Icon, message } from 'antd';
import Common from './Common';
import Sidebar from './Sidebar';
import Search from './Search';
import { columns } from '../../constants';

const propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

class Base extends Common {
  constructor(props) {
    super(props);

    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(path) {
    const { selectedCompanies } = this.state;

    selectedCompanies.length < 1
      ? message.error('Please select atleast one supplier to continue!')
      : this.props.history.push(path, { supplierIds: selectedCompanies });
  }

  render() {
    const { data, pagination, loading, onChange } = this.props;
    const { selectedCompanies } = this.state;

    return (
      <Row gutter={16}>
        <Sidebar />

        <Col span={18}>
          <Card title="Companies">
            <div className="table-operations">
              <Search />

              <Button onClick={() => this.handleSend('/eoi/publish')}>
                Send EOI
              </Button>
              <Button onClick={() => this.handleSend('/rfq/publish')}>
                Send RFQ
              </Button>
              <Button disabled>
                Export to excel
                <Icon type="file-excel" />
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
        </Col>
      </Row>
    );
  }
}

Base.propTypes = propTypes;

export default withRouter(Base);
