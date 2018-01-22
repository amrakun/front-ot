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
      type: this.tenderType,
      publishDate: this.publishDate
        ? this.getDateInterval(this.publishDate)
        : null,
      closeDate: this.closeDate ? this.getDateInterval(this.closeDate) : null
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
        <Icon type="file" />Export report
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
                onChange={value => this.onInputChange('publishDate', value)}
                format={dateFormat}
              />
            </p>

            <p>
              <label>Close date: </label>
              <RangePicker
                onChange={value => this.onInputChange('closeDate', value)}
                format={dateFormat}
              />
            </p>

            <Radio.Group
              onChange={value => this.onInputChange('tenderType', value)}
              value={this.tenderType}
            >
              <Radio value="eoi">EOI</Radio>
              <Radio value="rfq">RFQ</Radio>
            </Radio.Group>

            {this.renderButton(this.exportTenders)}
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
