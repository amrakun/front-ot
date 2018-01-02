import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker, Tag, Card, Row, Col } from 'antd';
import moment from 'moment';
import { Uploader } from 'modules/common/components';
import { days, dateTimeFormat } from 'modules/common/constants';
import AddMore from 'modules/companies/components/list/AddMore';
import { Editor } from 'modules/common/components';

const MainInfo = props => {
  const {
    renderField,
    renderOptions,
    onReceiveFile,
    data,
    supplierIds,
    content,
    onEmailContentChange
  } = props;

  const dateRange = data.publishDate
    ? [moment(data.publishDate), moment(data.closeDate)]
    : null;

  const supplierTags = supplierIds.map(el => (
    <Tag key={el.split('-')[0]}>{el.split('-')[1]}</Tag>
  ));
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
            <AddMore withTag={true} />
          </div>

          {renderField({
            ...fieldProps,
            label: 'Tender number',
            name: 'number',
            control: <Input type="number" />
          })}
          {renderField({
            ...fieldProps,
            label: 'Tender name',
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
            label: 'Expired day reminder',
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
  onEmailContentChange: PropTypes.func,
  onReceiveFile: PropTypes.func,
  location: PropTypes.object,
  data: PropTypes.object,
  content: PropTypes.string,
  supplierIds: PropTypes.array
};

export default MainInfo;
