import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker, Tag, Card, Row, Col, Tooltip } from 'antd';
import moment from 'moment';
import { Editor, Uploader } from 'modules/common/components';
import { days, dateTimeFormat, colors } from 'modules/common/constants';
import { AddCompany } from 'modules/companies/components';
import SupplierSearcher from 'modules/companies/containers/Searcher';

class MainInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    const {
      data: { content, attachments, suppliers }
    } = props;

    this.state = {
      content,
      attachments: (attachments || []).map(a => ({ ...a })),
      suppliers: (suppliers || []).map(s => ({ ...s }))
    };

    this.onEmailContentChange = this.onEmailContentChange.bind(this);
    this.onEmailAttachmentsChange = this.onEmailAttachmentsChange.bind(this);
    this.onAddSuppliers = this.onAddSuppliers.bind(this);
    this.removeSupplier = this.removeSupplier.bind(this);
  }

  getColoredTags(suppliers) {
    let ownerNames = [];

    suppliers.forEach(supplier => {
      const owner = this.getOwner(supplier);
      if (owner) ownerNames.push(owner);
    });

    return this.setColors(this.findDuplicates(ownerNames));
  }

  findDuplicates(array) {
    let result = [];

    array.forEach((element, index) => {
      if (array.indexOf(element, index + 1) > -1) {
        if (result.indexOf(element) === -1) {
          result.push(element);
        }
      }
    });

    return result;
  }

  setColors(array) {
    let result = {};

    array.forEach((element, index) => {
      result[element] =
        colors[index] || '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    });

    return result;
  }

  getOwner(supplier) {
    const info = supplier.shareholderInfo || {};

    if (!info) {
      return null;
    }

    if (info.shareholders && info.shareholders.length > 0) {
      return info.shareholders[0].name;
    }
  }

  onEmailContentChange(content) {
    this.setState({ content });

    this.props.onChange({ content });
  }

  onEmailAttachmentsChange(attachments) {
    this.setState({ attachments });

    this.props.onChange({ attachments });
  }

  onAddSuppliers(values) {
    const { onChange } = this.props;

    const suppliers = [...this.state.suppliers];
    const supplierIds = suppliers.map(s => s._id);

    values.forEach(value => {
      // Only add new suppliers
      if (!supplierIds.includes(value._id)) {
        suppliers.push(value);
      }
    });

    onChange({ suppliers });

    this.setState({ suppliers });
  }

  removeSupplier(supplierId) {
    const { onChange } = this.props;
    const { suppliers } = this.state;

    const updatedSuppliers = [];

    suppliers.forEach(supplier => {
      if (supplier._id !== supplierId) updatedSuppliers.push(supplier);
    });

    onChange({ suppliers: updatedSuppliers });

    this.setState({ suppliers: updatedSuppliers });
  }

  renderSupplierTags() {
    const { suppliers } = this.state;

    const coloredTags = this.getColoredTags(suppliers);

    return suppliers.map(supplier => {
      const owner = this.getOwner(supplier);

      return (
        <Tooltip key={supplier._id} title={owner ? `Owner: ${owner}` : ''}>
          <Tag
            color={coloredTags[owner] || null}
            key={supplier._id}
            closable={true}
            afterClose={() => this.removeSupplier(supplier._id)}
          >
            {supplier.basicInfo.enName}
          </Tag>
        </Tooltip>
      );
    });
  }

  renderExtraContent() {
    const { renderExtraContent } = this.props;

    if (renderExtraContent) {
      return renderExtraContent();
    }

    return null;
  }

  render() {
    const { renderField, renderOptions, data } = this.props;
    const { suppliers, content, attachments } = this.state;
    const { publishDate, closeDate } = data;

    const dateRange = publishDate
      ? [moment(publishDate), moment(closeDate)]
      : null;

    const fieldProps = {
      hasFeedback: false
    };

    return (
      <Row gutter={24}>
        <Col span={10}>
          <Card title="Main info" className="no-pad-bottom">
            {this.renderExtraContent()}

            <label>
              Requesting suppliers: <strong>{suppliers.length}</strong>
            </label>
            <br />

            <div
              style={{
                margin: '6px 0 16px 0',
                maxHeight: '200px',
                overflow: 'scroll'
              }}
            >
              {this.renderSupplierTags()}
              <SupplierSearcher onSelect={this.onAddSuppliers} />

              <AddCompany
                showInvite
                onAdd={supplier => this.onAddSuppliers([supplier])}
              />
            </div>

            {renderField({
              ...fieldProps,
              label: 'Number',
              name: 'number',
              control: <Input />
            })}
            {renderField({
              ...fieldProps,
              label: 'Description',
              name: 'name',
              control: <Input />
            })}
            {renderField({
              ...fieldProps,
              label: 'Date range',
              name: 'dateRange',
              initialValue: dateRange,
              control: (
                <DatePicker.RangePicker
                  style={{ width: '100% ' }}
                  showTime={{ format: 'HH:mm' }}
                  format={dateTimeFormat}
                  placeholder={['Publish date', 'Close date']}
                />
              )
            })}
            {renderField({
              ...fieldProps,
              label: 'Reminder',
              name: 'reminderDay',
              optional: true,
              control: <Select>{renderOptions(days)}</Select>
            })}
            {renderField({
              hasFeedback: false,
              optional: true,
              label: 'Officer name',
              name: 'sourcingOfficer',
              control: <Input />
            })}
            {renderField({
              hasFeedback: false,
              optional: true,
              label: 'File',
              name: 'file',
              dataType: 'file',
              control: <Uploader />
            })}
          </Card>
        </Col>

        <Col span={14}>
          <Card title="Email content">
            <Editor
              onEmailContentChange={this.onEmailContentChange}
              content={content || ''}
            />
          </Card>

          <Card title="Attachments">
            <Uploader
              onChange={this.onEmailAttachmentsChange}
              defaultFileList={attachments}
              multiple={true}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

MainInfo.propTypes = {
  // editing tender object
  data: PropTypes.object,
  renderField: PropTypes.func,
  renderOptions: PropTypes.func,
  onChange: PropTypes.func
};

export default MainInfo;
