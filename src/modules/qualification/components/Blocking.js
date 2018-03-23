import React from 'react';
import { withRouter } from 'react-router';
import {
  Table,
  Card,
  Button,
  Icon,
  Modal,
  Form,
  Input,
  DatePicker,
  Tag,
  message
} from 'antd';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';
import { Search } from 'modules/common/components';
import { Common } from 'modules/companies/components';
import SupplierSearcher from 'modules/companies/containers/Searcher';

const FormItem = Form.Item;

class Blocking extends Common {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      modalVisible: false,
      suppliers: []
    };

    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAddSuppliers = this.onAddSuppliers.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { form, blockCompanies } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err && this.state.suppliers.length > 0) {
        blockCompanies({
          supplierIds: this.getSupplierIds(),
          note: values.note,
          startDate: values.date[0],
          endDate: values.date[1]
        });
        this.hideModal();
      } else {
        message.error('Please add atleast one supplier!');
      }
    });
  }

  onAddSuppliers(values) {
    const suppliers = [...this.state.suppliers];
    const supplierIds = this.getSupplierIds();

    values.forEach(value => {
      // Only add new suppliers
      if (!supplierIds.includes(value._id)) {
        suppliers.push(value);
      }
    });

    this.setState({ suppliers });
  }

  getSupplierIds() {
    const { suppliers } = this.state;
    return suppliers.map(s => s._id);
  }

  columns() {
    return [
      {
        title: 'Supplier name',
        dataIndex: 'supplier.basicInfo.enName'
      },
      {
        title: 'Start date',
        render: record => moment(record.startDate).format(dateFormat)
      },
      {
        title: 'End date',
        render: record => moment(record.endDate).format(dateFormat)
      },
      {
        title: 'Note',
        dataIndex: 'note'
      },
      {
        title: 'By',
        dataIndex: 'createdUser.email'
      }
    ];
  }

  hideModal() {
    this.setState({ modalVisible: false, suppliers: [] });
  }

  showModal() {
    this.setState({ modalVisible: true, suppliers: [] });
  }

  render() {
    const {
      data,
      pagination,
      loading,
      onChange,
      unblockCompanies
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { selectedCompanies, suppliers } = this.state;

    const supplierTags = suppliers.map(el => {
      return <Tag key={el._id}>{el.basicInfo.enName}</Tag>;
    });

    return (
      <Card title="Blocking">
        <div className="table-operations">
          <Search />

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
            onChange: this.onSelectedCompaniesChange
          }}
          columns={this.columns()}
          rowKey={record => record.supplierId}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={(pagination, filters, sorter) =>
            onChange(pagination, filters, sorter)
          }
        />

        <Modal
          title="Block a supplier"
          visible={this.state.modalVisible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
        >
          <Form onSubmit={this.handleSubmit}>
            <div className="ant-form-item-label">
              <label className="ant-form-item-required">
                Blocking suppliers{' '}
              </label>
              {supplierTags}
              <SupplierSearcher slogan="Add" onSelect={this.onAddSuppliers} />
            </div>

            <FormItem label="Date range">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'This field is required!'
                  }
                ]
              })(
                <DatePicker.RangePicker
                  format={dateFormat}
                  placeholder={['Start date', 'End date']}
                />
              )}
            </FormItem>

            <FormItem label="Note">
              {getFieldDecorator('note')(
                <Input.TextArea style={{ height: '100px' }} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </Card>
    );
  }
}

const BlockingForm = Form.create()(Blocking);

export default withRouter(BlockingForm);
