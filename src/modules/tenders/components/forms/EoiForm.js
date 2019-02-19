import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Form, message, Select, Checkbox } from 'antd';
import { BaseForm } from 'modules/common/components';
import { regionOptions } from 'modules/companies/constants';
import EoiTable from './EoiTable';
import MainInfo from './MainInfo';
import SubmitButton from './SubmitButton';
import { clearContent } from '../utils';
import { initialDocuments } from '../../constants';

const { Option } = Select;
class EoiForm extends BaseForm {
  constructor(props, context) {
    super(props, context);

    this.emailTemplate = context.systemConfig.eoiTemplate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeMainInfo = this.onChangeMainInfo.bind(this);
    this.onChangeDocuments = this.onChangeDocuments.bind(this);

    const { tenderCreation, data } = props;
    const { isToAll, tierTypes, suppliers, attachments, content, requestedDocuments } = data || {};

    this.state = {
      requestedDocuments:
        (requestedDocuments || []).length > 0 ? requestedDocuments : initialDocuments,
      suppliers: suppliers || [],
      attachments: attachments || [],
      content: content || '',
      isToAll: typeof isToAll !== 'undefined' ? isToAll : true,
      tierTypes,
    };

    if (tenderCreation && suppliers.length > 0) {
      this.state.isToAll = false;
    }
  }

  onChangeMainInfo(mainInfoState) {
    this.setState(mainInfoState);
  }

  onChangeDocuments(requestedDocuments) {
    this.setState({ requestedDocuments });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { requestedDocuments, content, attachments, suppliers, isToAll, tierTypes } = this.state;

    if (!clearContent(content)) {
      return message.error('Content is required');
    }

    this.save({
      type: 'eoi',
      content,
      attachments,
      supplierIds: suppliers.map(s => s._id),
      isToAll,
      tierTypes,
      requestedDocuments,
    });
  }

  renderExtraContent() {
    const { data, buyers } = this.props;
    const { isToAll, tierTypes } = this.state;

    const options = regionOptions.map(region => {
      return (
        <Option value={region.value} key={region.value}>
          {region.label}
        </Option>
      );
    });

    let tierTypesField;

    if (isToAll === false) {
      tierTypesField = (
        <Form.Item label="Tier types">
          <Select
            value={tierTypes}
            mode="multiple"
            onChange={tierTypes => this.setState({ tierTypes })}
          >
            {options}
          </Select>
        </Form.Item>
      );
    }

    const buyersOptions = buyers.map(buyer => {
      return (
        <Option value={buyer._id} key={buyer._id}>
          {buyer.firstName} {buyer.lastName}
        </Option>
      );
    });

    return (
      <div>
        <p>
          <Checkbox checked={isToAll} onChange={e => this.setState({ isToAll: e.target.checked })}>
            To all suppliers
          </Checkbox>
        </p>

        {tierTypesField}

        {this.renderField({
          label: 'Responsible officers',
          name: 'responsibleBuyerIds',
          optional: true,
          initialValue: data.responsibleBuyerIds,
          control: (
            <Select mode="multiple">
              {buyersOptions}
            </Select>
          ),
        })}
      </div>
    );
  }

  render() {
    const { data } = this.props;
    const { isToAll, tierTypes } = this.state;
    const { __ } = this.context;

    return (
      <Form>
        <div>
          <MainInfo
            data={data}
            renderExtraContent={this.renderExtraContent.bind(this)}
            renderField={this.renderField.bind(this)}
            renderOptions={this.renderOptions.bind(this)}
            onChange={this.onChangeMainInfo}
            showSuppliers={!isToAll && (!tierTypes || tierTypes.length === 0)}
          />
        </div>

        <Card title="Form" className="margin">
          <EoiTable
            requestedDocuments={data.requestedDocuments}
            onChange={this.onChangeDocuments}
          />
        </Card>

        <SubmitButton onConfirm={this.handleSubmit} __={__} />
      </Form>
    );
  }
}

EoiForm.propTypes = {
  data: PropTypes.object,
};

EoiForm.contextTypes = {
  systemConfig: PropTypes.object,
  __: PropTypes.func,
};

const form = Form.create()(EoiForm);

export default withRouter(form);
