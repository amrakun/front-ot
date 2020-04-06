/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Row, Col, Button, Icon, message } from 'antd';
import { Common, Sidebar } from 'modules/companies/components';
import { Search } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';
import ModalForm from './physical/ModalForm';

class Audit extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      selectedSuppliers: [],
      physicalAuditModalVisible: false,
    };

    this.handleSend = this.handleSend.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(companyIds, selectedSuppliers) {
    this.setState({ selectedSuppliers });
  }

  handleSend(path) {
    const { selectedSuppliers } = this.state;

    this.props.history.push(path, {
      supplierIds: selectedSuppliers.map(s => s._id),
    });
  }

  togglePhysicalAuditModal(value) {
    if (value && this.state.selectedCompanies.length !== 1)
      message.error('Please select only one supplier');
    else this.setState({ physicalAuditModalVisible: value });
  }

  toggleViewModal(value) {
    this.setState({ viewModalVisible: value });
  }

  render() {
    const { totalCount, addPhysicalAudit } = this.props;
    const { selectedCompanies, physicalAuditModalVisible } = this.state;

    const columns = this.getWrappedColumns([
      {
        title: 'Qualified',
        render: report => report.qualificationStatusDisplay,
      },
      {
        title: 'Report',
        render: () => <a href="#view">View</a>,
      },
      {
        title: 'Improvement plan',
        render: () => <a href="#view">View</a>,
      },
      {
        title: 'Last qualification date',
        render: record =>
          record.lastAudit ? moment(record.lastAudit.closeDate).format(dateFormat) : '-',
      },
    ]);

    return (
      <Row gutter={16}>
        <Sidebar
          suppliersCount={totalCount}
          checkedCount={selectedCompanies ? selectedCompanies.length : 0}
        />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={() => this.togglePhysicalAuditModal(true)}>
                Insert physical audit
                <Icon type="mail" />
              </Button>

              <Button onClick={() => this.handleSend('/audit/send')}>
                Send desktop audit invitation
                <Icon type="mail" />
              </Button>
            </div>

            {this.renderTable({
              rowSelection: {
                selectedCompanies,
                onChange: this.handleCheck,
              },
              columns,
            })}
          </Card>

          <ModalForm
            visible={physicalAuditModalVisible}
            onSubmit={inputs =>
              addPhysicalAudit({
                supplierId: selectedCompanies ? selectedCompanies[0] : '',
                ...inputs,
              })
            }
            hideModal={() => this.togglePhysicalAuditModal(false)}
          />
        </Col>
      </Row>
    );
  }
}

export default withRouter(Audit);
