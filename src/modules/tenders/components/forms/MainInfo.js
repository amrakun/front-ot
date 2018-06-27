import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker, Tag, Card, Row, Col, Tooltip } from 'antd';
import moment from 'moment';
import { Editor, Uploader } from 'modules/common/components';
import { days, dateTimeFormat, colors } from 'modules/common/constants';
import { AddCompany } from 'modules/companies/components';
import SupplierSearcher from 'modules/companies/containers/Searcher';

function getColoredTags(suppliers) {
  let ownerNames = [];

  suppliers.forEach(supplier => {
    const owner = getOwner(supplier);
    if (owner) ownerNames.push(owner);
  });

  return setColors(findDuplicates(ownerNames));
}

function findDuplicates(array) {
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

function setColors(array) {
  let result = {};

  array.forEach((element, index) => {
    result[element] =
      colors[index] || '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  });

  return result;
}

function getOwner(supplier) {
  const info = supplier.shareholderInfo || {};

  if (info)
    if (info.shareholders) return info.shareholders[0].name;
    else return null;
}

const MainInfo = props => {
  const {
    renderField,
    renderOptions,
    data,
    suppliers,
    content,
    onEmailContentChange,
    onAddSuppliers,
    removeSupplier
  } = props;

  const dateRange = data.publishDate
    ? [moment(data.publishDate), moment(data.closeDate)]
    : null;

  const coloredTags = getColoredTags(suppliers);

  const supplierTags = suppliers.map(supplier => {
    const owner = getOwner(supplier);
    return (
      <Tooltip key={supplier._id} title={owner ? `Owner: ${owner}` : ''}>
        <Tag
          color={coloredTags[owner] || null}
          key={supplier._id}
          closable={true}
          afterClose={() => removeSupplier(supplier._id)}
        >
          {supplier.basicInfo.enName}
        </Tag>
      </Tooltip>
    );
  });

  const fieldProps = {
    hasFeedback: false
  };

  return (
    <Row gutter={24}>
      <Col span={10}>
        <Card title="Main info" className="no-pad-bottom">
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
            {supplierTags}
            <SupplierSearcher onSelect={onAddSuppliers} />

            <AddCompany
              showInvite={window.location.href.includes('eoi')}
              onAdd={supplier => onAddSuppliers([supplier])}
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
            onEmailContentChange={onEmailContentChange}
            content={content || ''}
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
  onAddSuppliers: PropTypes.func,
  removeSupplier: PropTypes.func
};

export default MainInfo;
