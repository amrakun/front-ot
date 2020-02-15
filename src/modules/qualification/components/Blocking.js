import React from 'react';
import { withRouter } from 'react-router';
import { Table, Card, Button, Icon, Modal, Form, Input, DatePicker, message } from 'antd';
import { dateTimeFormat } from 'modules/common/constants';
import moment from 'moment';
import { Common } from 'modules/companies/components';
import SupplierSearcher from 'modules/companies/containers/Searcher';

const FormItem = Form.Item;

class Blocking extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      modalVisible: false,
      suppliers: [],
      blockedSuppliers: null,
    };

    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelectSuppliers = this.onSelectSuppliers.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { form, blockCompanies } = this.props;
    const { suppliers } = this.state;

    form.validateFieldsAndScroll((err, values) => {
      if (!err && this.state.suppliers.length > 0) {
        blockCompanies({
          supplierIds: suppliers.map(s => s._id),
          note: values.note,
          startDate: values.date[0],
          endDate: values.date[1],
        });
        this.hideModal();
      } else {
        message.error('Please add atleast one supplier!');
      }
    });
  }

  handleSearch(value) {
    const { data } = this.props;

    const searchResults = [];

    data.forEach(blockedSupplier => {
      if (blockedSupplier.supplier.basicInfo.enName.toLowerCase().includes(value.toLowerCase()))
        searchResults.push(blockedSupplier);
    });

    this.setState({ blockedSuppliers: searchResults });
  }

  onSelectSuppliers(suppliers) {
    this.setState({ suppliers });
  }

  columns() {
    return [
      {
        title: 'Supplier name',
        dataIndex: 'supplier.basicInfo.enName',
      },
      {
        title: 'Start date',
        render: record => moment(record.startDate).format(dateTimeFormat),
      },
      {
        title: 'End date',
        render: record => moment(record.endDate).format(dateTimeFormat),
      },
      {
        title: 'Note',
        dataIndex: 'note',
      },
      {
        title: 'By',
        dataIndex: 'createdUser.email',
      },
    ];
  }

  hideModal() {
    this.setState({ modalVisible: false, suppliers: [] });
  }

  showModal() {
    this.setState({ modalVisible: true, suppliers: [] });
  }

  render() {
    const { data, pagination, loading, onChange, unblockCompanies } = this.props;

    const { getFieldDecorator } = this.props.form;
    const { selectedCompanies, blockedSuppliers } = this.state;

    return (
      <Card title="Blocking">
        <div className="table-operations">
          <Input
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={'Supplier name'}
            onPressEnter={e => this.handleSearch(e.target.value)}
            className="suppliers-search"
          />

          <Button
            disabled={selectedCompanies.length < 1}
            onClick={() => unblockCompanies({ supplierIds: selectedCompanies })}
          >
            <Icon type="minus" />
            Unblock
          </Button>
          <Button type="primary" onClick={() => this.showModal()}>
            <Icon type="plus" />
            Block
          </Button>
        </div>
        <Table
          rowSelection={{
            selectedCompanies,
            onChange: this.onSelectedCompaniesChange,
          }}
          columns={this.columns()}
          rowKey={record => record.supplierId}
          dataSource={blockedSuppliers || data}
          pagination={pagination}
          loading={loading}
          onChange={(pagination, filters, sorter) => onChange(pagination, filters, sorter)}
        />

        <Modal
          title="Block a supplier"
          visible={this.state.modalVisible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
        >
          <Form onSubmit={this.handleSubmit}>
            <div className="ant-form-item-label">
              <label className="ant-form-item-required">Blocking suppliers </label>
              <SupplierSearcher onSelect={this.onSelectSuppliers} />
            </div>

            <FormItem label="Date range">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ],
              })(
                <DatePicker.RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format={dateTimeFormat}
                  placeholder={['Start date', 'End date']}
                />
              )}
            </FormItem>

            <FormItem label="Note">
              {getFieldDecorator('note')(<Input.TextArea style={{ height: '100px' }} />)}
            </FormItem>
          </Form>
        </Modal>
      </Card>
    );
  }
}

const BlockingForm = Form.create()(Blocking);

export default withRouter(BlockingForm);
