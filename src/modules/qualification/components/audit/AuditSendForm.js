import React from 'react';
import { Form, DatePicker, Card, Row, Col, Select, message } from 'antd';
import moment from 'moment';
import { BaseForm, EditorCK, SubmitButton } from 'modules/common/components';
import { clearContent } from 'modules/common/utils';
import { dateTimeFormat } from 'modules/common/constants';
import { AddCompany } from 'modules/companies/components';
import SupplierSearcher from 'modules/companies/containers/Searcher';
import PropTypes from 'prop-types';

const { Option } = Select;

class SendForm extends BaseForm {
  constructor(props, context) {
    super(props, context);

    const { data } = props;
    const { suppliers, content } = data || {};

    this.state = {
      content,
      newlyInvitedSuppliers: [],
      suppliers: (suppliers || []).map(s => ({ ...s })),
    };

    this.onEmailContentChange = this.onEmailContentChange.bind(this);
    this.onChangeSuppliers = this.onChangeSuppliers.bind(this);
    this.onInviteSupplier = this.onInviteSupplier.bind(this);
  }

  onEmailContentChange(e) {
    this.setState({ content: e.editor.getData() });
  }

  onChangeSuppliers(suppliers) {
    this.setState({ suppliers });
  }

  onInviteSupplier(supplier) {
    this.setState({
      newlyInvitedSuppliers: [supplier],
      suppliers: [...this.state.suppliers, supplier],
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { content, suppliers } = this.state;

    if (!clearContent(content)) {
      return message.error('Content is required');
    }

    this.save({
      content,
      supplierIds: suppliers.map(s => s._id),
    });
  }

  renderSuppliers() {
    const { data } = this.props;
    const { suppliers, newlyInvitedSuppliers } = this.state;

    return (
      <div>
        <label>
          Requesting suppliers: <strong>{suppliers.length}</strong>
        </label>
        <br />

        <div
          style={{
            margin: '6px 0 16px 0',
            maxHeight: '200px',
            overflow: 'scroll',
          }}
        >
          <SupplierSearcher
            title="Add an existing supplier"
            onSelect={this.onChangeSuppliers}
            initialChosenSuppliers={data.suppliers}
            newlyInvitedSuppliers={newlyInvitedSuppliers}
          />

          <AddCompany showInvite onAdd={supplier => this.onInviteSupplier(supplier)} />
        </div>
      </div>
    );
  }

  renderPreview() {
    const { content } = this.state;

    if (!content) {
      return null;
    }

    const { systemConfig } = this.context;

    const desktopAuditTemplates = systemConfig.desktopAuditTemplates || {};
    const invitationTemplate = desktopAuditTemplates.supplier__invitation || {};
    const contentMap = invitationTemplate.content || {};
    const mnContent = contentMap.mn || contentMap.en;

    const html = mnContent.replace('{content}', content);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  render() {
    const { data, buyers, isSubmitted } = this.props;
    const { content } = this.state;
    const { startDate, endDate } = data;

    const dateRange = startDate ? [moment(startDate), moment(endDate)] : null;

    const fieldProps = {
      hasFeedback: false,
    };

    const buyersOptions = buyers.map(buyer => {
      return (
        <Option value={buyer._id} key={buyer._id}>
          {buyer.firstName} {buyer.lastName}
        </Option>
      );
    });

    return (
      <Form>
        <Row gutter={24}>
          <Col span={9}>
            <Card title="Main info" className="no-pad-bottom">
              {this.renderField({
                label: 'Responsible officers',
                name: 'responsibleBuyerIds',
                initialValue: data.responsibleBuyerIds,
                control: <Select mode="multiple">{buyersOptions}</Select>,
              })}

              {this.renderSuppliers()}

              {this.renderField({
                ...fieldProps,
                label: 'Date range',
                name: 'dateRange',
                initialValue: dateRange,
                control: (
                  <DatePicker.RangePicker
                    style={{ width: '100% ' }}
                    showTime={{ format: 'HH:mm' }}
                    format={dateTimeFormat}
                    placeholder={['Start date', 'End date']}
                  />
                ),
              })}
            </Card>
          </Col>

          <Col span={15}>
            <Card title="Email content">
              <EditorCK content={content || ''} onChange={this.onEmailContentChange} />
              <p>
                <label>
                  <strong>Preview</strong>:{' '}
                </label>
                {this.renderPreview()}
              </p>
            </Card>

            <SubmitButton isSubmitted={isSubmitted} onConfirm={this.handleSubmit} __={v => v} />
          </Col>
        </Row>
      </Form>
    );
  }
}

SendForm.contextTypes = {
  systemConfig: PropTypes.object,
};

const form = Form.create()(SendForm);

export default form;
