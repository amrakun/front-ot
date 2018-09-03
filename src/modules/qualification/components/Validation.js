/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Card,
  Row,
  Col,
  Modal,
  Checkbox,
  Divider,
  Form,
  Button,
  Input,
  Icon
} from 'antd';
import { Uploader, Search } from 'modules/common/components';
import { dateFormat } from 'modules/common/constants';
import { getFlatProductsTree } from 'modules/common/utils';
import { Common } from 'modules/companies/components';
import { Sidebar } from 'modules/companies/components';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class Validation extends Common {
  constructor(props, context) {
    super(props, context);

    this.state = { currentCompany: null };

    this.showValidationModal = this.showValidationModal.bind(this);
    this.hideValidationModal = this.hideValidationModal.bind(this);
    this.handleValidationSave = this.handleValidationSave.bind(this);

    const { locale = 'en' } = context;

    this.flatProductsInfo = getFlatProductsTree(locale);
  }

  handleValidationSave(values) {
    const { currentCompany } = this.state;

    this.props.addValidation({ _id: currentCompany._id, ...values });
    this.hideValidationModal();
  }

  showValidationModal(company) {
    this.setState({ currentCompany: company });
  }

  hideValidationModal() {
    this.setState({ currentCompany: null });
  }

  render() {
    const { totalCount, exportExcel } = this.props;
    const { currentCompany } = this.state;

    // generate last products info validation
    const generateLPIV = (record, fieldName) => {
      const lastProductsInfoValidation =
        record.lastProductsInfoValidation || {};
      const value = lastProductsInfoValidation[fieldName];

      if (!value) {
        return '-';
      }

      return value;
    };

    const columns = this.getWrappedColumns([
      {
        title: 'Product/Service code',
        render: record => {
          const productsInfo = record.productsInfo;

          if (productsInfo.length === 0) {
            return '-';
          }

          return (
            <a onClick={() => this.showValidationModal(record)}>
              Total: <strong>{productsInfo.length}</strong>
              <Divider type="vertical" />
              Validated:&nbsp;
              <strong>{record.validatedProductsInfo.length}</strong>
            </a>
          );
        }
      },
      {
        title: 'Last validation date',
        render: record => {
          const value = generateLPIV(record, 'date');

          if (value === '-') {
            return value;
          }

          return moment(value).format(dateFormat);
        }
      },
      {
        title: 'Last validated person name',
        render: record => generateLPIV(record, 'personName')
      },
      {
        title: 'Last justification',
        render: record => generateLPIV(record, 'justification')
      },
      {
        title: 'Last validation result',
        render: record => {
          if (typeof record.isProductsInfoValidated === 'undefined') {
            return '-';
          }

          return record.isProductsInfoValidated ? 'Yes' : 'No';
        }
      },
      {
        title: 'Last supporting documents',
        render: record => {
          const files = generateLPIV(record, 'files') || [];

          const links = [];

          for (const file of files) {
            links.push(
              <a target="__blank" key={Math.random()} href={file.url}>
                {file.name},{' '}
              </a>
            );
          }

          return links;
        }
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={totalCount} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={exportExcel}>
                Export excel
                <Icon type="file-excel" />
              </Button>
            </div>
            {this.renderTable({ columns })}
          </Card>

          <ValidationForm
            company={currentCompany}
            flatProductsInfo={this.flatProductsInfo}
            hide={this.hideValidationModal}
            onSave={this.handleValidationSave}
          />
        </Col>
      </Row>
    );
  }
}

class ValidationModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);

    this.state = { files: [] };
  }

  handleSubmit(e) {
    e.preventDefault();

    const { form, onSave } = this.props;
    const { files } = this.state;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSave({ files, ...values });
      }
    });
  }

  onFileUpload(files) {
    this.setState({ files: files.filter(file => file.url) });
  }

  generateOptions(flatProductsInfo, productsInfo) {
    return productsInfo.map(p => ({
      value: p,
      label: flatProductsInfo[p] || ''
    }));
  }

  render() {
    const { flatProductsInfo, form, hide, company } = this.props;
    const { getFieldDecorator } = form;

    if (!company) {
      return null;
    }

    return (
      <Modal
        title={`Validate: ${company.basicInfo.enName}`}
        onOk={this.handleSubmit}
        visible={true}
        onCancel={hide}
        bodyStyle={{ maxHeight: '60vh', overflow: 'scroll' }}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Validated person name">
            {getFieldDecorator('personName', {})(<Input />)}
          </FormItem>

          <FormItem label="Justification*">
            {getFieldDecorator('justification', {
              rules: [
                { required: true, message: 'Please input justification!' }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem label="Supporting documents">
            {getFieldDecorator('files', {})(
              <Uploader multiple onChange={this.onFileUpload} />
            )}
          </FormItem>

          <FormItem label="Check validated">
            {getFieldDecorator('checkedItems', {
              initialValue: company.validatedProductsInfo
            })(
              <CheckboxGroup
                options={this.generateOptions(
                  flatProductsInfo,
                  company.productsInfo
                )}
                className="horizontal capitalize"
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ValidationModal.propTypes = {
  flatProductsInfo: PropTypes.object,
  form: PropTypes.object,
  company: PropTypes.object,
  hide: PropTypes.func,
  onSave: PropTypes.func
};

const ValidationForm = Form.create()(ValidationModal);

export default withRouter(Validation);
