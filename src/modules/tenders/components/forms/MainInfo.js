import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, DatePicker, Tag } from 'antd';
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

  const supplierTags = supplierIds.map(el => <Tag key={el}>{el}</Tag>);

  return (
    <div>
      <label>Sending RFQ to: </label>
      {supplierTags}
      <AddMore withTag={true} />
      <p style={{ paddingBottom: '16px' }} />

      {renderField({
        name: 'number',
        optional: true,
        control: <InputNumber placeholder="Tender number" htmlType="number" />
      })}
      {renderField({
        name: 'name',
        optional: true,
        control: <Input placeholder="Tender name" />
      })}
      {renderField({
        name: 'dateRange',
        optional: true,
        initialValue: dateRange,
        control: (
          <DatePicker.RangePicker
            showTime={{ format: 'HH:mm' }}
            format={dateTimeFormat}
            placeholder={['Start date', 'End date']}
          />
        )
      })}
      {renderField({
        name: 'reminderDay',
        optional: true,
        control: (
          <Select placeholder="Expired day reminder">
            {renderOptions(days)}
          </Select>
        )
      })}
      {renderField({
        name: 'file',
        dataType: 'file',
        control: (
          <Uploader initialFile={data.file} onReceiveFile={onReceiveFile} />
        )
      })}
      <Editor onEmailContentChange={onEmailContentChange} content={content} />
    </div>
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
