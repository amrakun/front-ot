import React from 'react';
import PropTypes from 'prop-types';
import productsTree from 'modules/companies/productsTree';
import {
  Card,
  Row,
  Col,
  TreeSelect,
  Select,
  Checkbox,
  Button,
  Icon,
  Radio,
  DatePicker,
  Input
} from 'antd';

import { dateFormat } from 'modules/common/constants';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.tenderType = 'eoi';
    this.isPrequalified = false;
    this.tierType = '';
    this.tenderTypeAudits = 'desktop';

    this.onInputChange = this.onInputChange.bind(this);
    this.onIsPrequalifiedChange = this.onIsPrequalifiedChange.bind(this);
    this.onTierTypeChange = this.onTierTypeChange.bind(this);
    this.exportSuppliers = this.exportSuppliers.bind(this);
    this.exportTenders = this.exportTenders.bind(this);
    this.exportAudits = this.exportAudits.bind(this);
    this.exportShareholders = this.exportShareholders.bind(this);
  }

  onIsPrequalifiedChange(e) {
    this.isPrequalified = e.target.checked;
  }

  onTierTypeChange(value) {
    this.tierType = value;
  }

  onInputChange(name, value) {
    this[name] = value;
  }

  exportSuppliers() {
    this.props.export('reportsSuppliersExport', {
      productCodes: this.productCodes,
      isPrequalified: this.isPrequalified,
      tierType: this.tierType
    });
  }

  exportTenders() {
    this.props.export('reportsTendersExport', {
      type: this.tenderTypeTenders,
      publishDate: this.publishDateTenders
        ? this.getDateInterval(this.publishDateTenders)
        : null,
      closeDate: this.closeDateTenders
        ? this.getDateInterval(this.closeDateTenders)
        : null
    });
  }

  exportAudits() {
    this.props.export('reportsAuditExport', {
      type: this.tenderTypeAudits,
      publishDate: this.publishDateAudits
        ? this.getDateInterval(this.publishDateAudits)
        : null,
      closeDate: this.closeDateAudits
        ? this.getDateInterval(this.closeDateAudits)
        : null
    });
  }

  exportShareholders() {
    this.props.export('reportsShareholder', {
      name: this.shareholderName
    });
  }

  getDateInterval(date) {
    return {
      startDate: date[0],
      endDate: date[1]
    };
  }

  renderButton(onClick) {
    return (
      <Button onClick={onClick} className="report-btn">
        <Icon type="file-excel" />Export report
      </Button>
    );
  }

  render() {
    const span = {
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24
    };

    return (
      <Row gutter={24} className="card-columns">
        <Col {...span}>
          <Card title="Suppliers profile">
            <TreeSelect
              treeData={productsTree.en}
              onChange={value => this.onInputChange('productCodes', value)}
              treeCheckable={true}
              searchPlaceholder="Please select"
              style={{ width: '100%', marginBottom: '16px' }}
            />

            <Checkbox
              style={{ marginBottom: '16px' }}
              onChange={this.onIsPrequalifiedChange}
            >
              Pre-qualified
            </Checkbox>

            <Select
              style={{ width: '100%', marginBottom: '16px' }}
              onChange={this.onTierTypeChange}
            >
              <Option value="national">National suppliers</Option>
              <Option value="umnugobi">Umnugovi suppliers</Option>
              <Option value="tier1">International Tier 1 suppliers</Option>
              <Option value="tier2">International Tier 2 suppliers</Option>
              <Option value="tier3">International Tier 3 suppliers</Option>
            </Select>

            {this.renderButton(this.exportSuppliers)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="EOI/RFQ">
            <p>
              <label>Publish date: </label>
              <RangePicker
                onChange={value =>
                  this.onInputChange('publishDateTenders', value)
                }
                format={dateFormat}
              />
            </p>

            <p>
              <label>Close date: </label>
              <RangePicker
                onChange={value =>
                  this.onInputChange('closeDateTenders', value)
                }
                format={dateFormat}
              />
            </p>

            <Radio.Group
              onChange={e =>
                this.onInputChange('tenderTypeTenders', e.target.value)
              }
              defaultValue={this.tenderType}
            >
              <Radio value="eoi">EOI</Radio>
              <Radio value="rfq">RFQ</Radio>
            </Radio.Group>

            {this.renderButton(this.exportTenders)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="Audits">
            <p>
              <label>Publish date: </label>
              <RangePicker
                onChange={value =>
                  this.onInputChange('publishDateAudits', value)
                }
                format={dateFormat}
              />
            </p>

            <p>
              <label>Close date: </label>
              <RangePicker
                onChange={value => this.onInputChange('closeDateAudits', value)}
                format={dateFormat}
              />
            </p>

            <Radio.Group
              onChange={e =>
                this.onInputChange('tenderTypeAudits', e.target.value)
              }
              defaultValue={this.tenderTypeAudits}
            >
              <Radio value="desktop">Desktop</Radio>
              <Radio value="physical">Physical</Radio>
            </Radio.Group>

            {this.renderButton(this.exportAudits)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="Shareholders report">
            <Input
              onChange={e =>
                this.onInputChange('shareholderName', e.target.value)
              }
            />
            {this.renderButton(this.exportShareholders)}
          </Card>
        </Col>
      </Row>
    );
  }
}

Dashboard.propTypes = {
  export: PropTypes.func
};

export default Dashboard;
