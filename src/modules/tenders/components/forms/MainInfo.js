import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker, Tag, Card, Row, Col } from 'antd';
import moment from 'moment';
import { Editor, Uploader } from 'modules/common/components';
import { days, dateTimeFormat } from 'modules/common/constants';
import { SupplierSearcher } from 'modules/companies/components';

const MainInfo = props => {
  const {
    renderField,
    renderOptions,
    data,
    suppliers,
    content,
    onEmailContentChange,
    onReceiveFile,
    onAddSuppliers
  } = props;

  const dateRange = data.publishDate
    ? [moment(data.publishDate), moment(data.closeDate)]
    : null;

  const supplierTags = suppliers.map(el => {
    return <Tag key={el._id}>{el.basicInfo.enName}</Tag>;
  });

  const fieldProps = {
    hasFeedback: false
  };

  return (
    <Row gutter={24}>
      <Col span={10}>
        <Card title="Main info" className="no-pad-bottom">
          <label>Requesting suppliers: </label>
          <br />

          <div style={{ margin: '6px 0 16px 0' }}>
            {supplierTags}
            <SupplierSearcher withTag={true} onSelect={onAddSuppliers} />
          </div>

          {renderField({
            ...fieldProps,
            label: 'Number',
            name: 'number',
            control: <Input type="number" />
          })}
          {renderField({
            ...fieldProps,
            label: 'Name',
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
            control: <Select>{renderOptions(days)}</Select>
          })}
          {renderField({
            hasFeedback: false,
            optional: true,
            label: 'File',
            name: 'file',
            dataType: 'file',
            control: (
              <Uploader initialFile={data.file} onReceiveFile={onReceiveFile} />
            )
          })}
        </Card>
      </Col>
      <Col span={14}>
        <Card title="Email content">
          <Editor
            onEmailContentChange={onEmailContentChange}
            content={content}
          />
        </Card>
      </Col>
    </Row>
  );
};

MainInfo.propTypes = {
  renderField: PropTypes.func,
  renderOptions: PropTypes.func,
  location: PropTypes.object,
  data: PropTypes.object,
  content: PropTypes.string,
  suppliers: PropTypes.array,
  onEmailContentChange: PropTypes.func,
  onReceiveFile: PropTypes.func,
  onAddSuppliers: PropTypes.func
};

export default MainInfo;
