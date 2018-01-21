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
      publishDate: this.getDateInterval(this.publishDate),
      closeDate: this.getDateInterval(this.closeDate)
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
    return (
      <Row gutter={24}>
        <Col span={8}>
          <Card title="Suppliers">
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

        <Col span={8}>
          <Card title="Suppliers">
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
              defaultValue="eoi"
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
