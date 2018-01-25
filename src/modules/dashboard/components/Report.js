import React from 'react';
import PropTypes from 'prop-types';
import productsTree from 'modules/companies/productsTree';
import {
  Card,
  Row,
  Col,
  TreeSelect,
  Checkbox,
  Button,
  Icon,
  Radio,
  DatePicker
} from 'antd';
import { dateFormat } from 'modules/common/constants';

const RangePicker = DatePicker.RangePicker;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.tenderType = 'eoi';
    this.isPrequalified = false;

    this.onInputChange = this.onInputChange.bind(this);
    this.onIsPrequalifiedChange = this.onIsPrequalifiedChange.bind(this);
    this.exportSuppliers = this.exportSuppliers.bind(this);
    this.exportTenders = this.exportTenders.bind(this);
    this.exportAudits = this.exportAudits.bind(this);
  }

  onIsPrequalifiedChange(e) {
    this.isPrequalified = e.target.checked;
  }

  onInputChange(name, value) {
    this[name] = value;
  }

  exportSuppliers() {
    this.props.export('reportsSuppliersExport', {
      productCodes: this.productCodes,
      isPrequalified: this.isPrequalified
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
      xl: 8,
      lg: 12,
      md: 24
    };

    return (
      <Row gutter={24}>
        <Col {...span}>
          <Card title="Suppliers profile">
            <TreeSelect
              treeData={productsTree}
              onChange={value => this.onInputChange('productCodes', value)}
              treeCheckable={true}
              searchPlaceholder="Please select"
              style={{ width: '100%', marginBottom: '16px' }}
            />

            <Checkbox onChange={this.onIsPrequalifiedChange}>
              Pre-qualified
            </Checkbox>

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
              onChange={value => this.onInputChange('tenderTypeTenders', value)}
              value={this.tenderType}
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
              onChange={value => this.onInputChange('tenderTypeAudits', value)}
              value={this.tenderType}
            >
              <Radio value="eoi">EOI</Radio>
              <Radio value="rfq">RFQ</Radio>
            </Radio.Group>

            {this.renderButton(this.exportAudits)}
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
