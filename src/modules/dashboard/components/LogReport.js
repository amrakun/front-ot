import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Row,
  Col,
  Button,
  TreeSelect,
  Select,
  Icon,
  DatePicker
} from 'antd';
import { dateFormat } from 'modules/common/constants';
import productsTree from '../../companies/productsTree';
import { MODULES_TO_TEXT } from '../constants';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productCodes: []
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.logsSupplierLoginsExport = this.logsSupplierLoginsExport.bind(this);
    this.logsBuyerLoginsExport = this.logsBuyerLoginsExport.bind(this);
    this.logsSupplierLoginsByEoiSubmissionsExport = this.logsSupplierLoginsByEoiSubmissionsExport.bind(
      this
    );
    this.logsSupplierLoginsByRfqSubmissionsExport = this.logsSupplierLoginsByRfqSubmissionsExport.bind(
      this
    );
    this.logsSearchesPerBuyerExport = this.logsSearchesPerBuyerExport.bind(
      this
    );
    this.logsEoiCreatedAndSentExport = this.logsEoiCreatedAndSentExport.bind(
      this
    );
    this.logsRfqCreatedAndSentExport = this.logsRfqCreatedAndSentExport.bind(
      this
    );

    this.logsSuppliersByProductCodeLogsExport = this.logsSuppliersByProductCodeLogsExport.bind(
      this
    );

    this.logsActivityLogsExport = this.logsActivityLogsExport.bind(this);

    this.onProductCodesChange = this.onProductCodesChange.bind(this);

    this.onModuleChange = this.onModuleChange.bind(this);
  }

  onInputChange(name, value) {
    this[name] = value;
  }

  logsSupplierLoginsExport() {
    this.props.export(
      'logsSupplierLoginsExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  logsBuyerLoginsExport() {
    this.props.export(
      'logsBuyerLoginsExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  logsSupplierLoginsByEoiSubmissionsExport() {
    this.props.export(
      'logsSupplierLoginsByEoiSubmissionsExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  logsSupplierLoginsByRfqSubmissionsExport() {
    this.props.export(
      'logsSupplierLoginsByRfqSubmissionsExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  logsSearchesPerBuyerExport() {
    this.props.export(
      'logsSearchesPerBuyerExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  logsEoiCreatedAndSentExport() {
    this.props.export(
      'logsEoiCreatedAndSentExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  logsRfqCreatedAndSentExport() {
    this.props.export(
      'logsRfqCreatedAndSentExport',
      this.getDateInterval(this.intervalDate)
    );
  }

  logsSuppliersByProductCodeLogsExport() {
    this.props.export('logsSuppliersByProductCodeLogsExport', {
      ...this.getDateInterval(this.intervalDate),
      productCodes: this.state.productCodes
    });
  }

  logsActivityLogsExport() {
    this.props.export('logsActivityLogsExport', {
      ...this.getDateInterval(this.intervalDate),
      module: this.state.module
    });
  }

  onProductCodesChange(value) {
    this.setState({ productCodes: value });
  }

  onModuleChange(value) {
    this.setState({ module: value });
  }

  getDateInterval(date) {
    return {
      startDate: date ? date[0] : new Date(),
      endDate: date ? date[1] : new Date()
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

    const activityLogOptions = [];
    activityLogOptions.push(
      <Option key={''} value={''}>
        All modules
      </Option>
    );
    for (let option of MODULES_TO_TEXT) {
      activityLogOptions.push(
        <Option key={option[0]} value={option[0]}>
          {option[1]}
        </Option>
      );
    }

    return (
      <Row gutter={24} className="card-columns">
        <Col {...span}>
          <Card title="Supplier logins">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.logsSupplierLoginsExport)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="Buyer logins">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.logsBuyerLoginsExport)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="Supplier logins by EOI submissions">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.logsSupplierLoginsByEoiSubmissionsExport)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="Supplier logins by RFQ submissions">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.logsSupplierLoginsByRfqSubmissionsExport)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="Searches per buyer">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.logsSearchesPerBuyerExport)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="EOI created and sent">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.logsEoiCreatedAndSentExport)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="RFQ created and sent">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>

            {this.renderButton(this.logsRfqCreatedAndSentExport)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="Code searches per buyer">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>
            <div>
              <label>Product code: </label>

              <TreeSelect
                treeData={productsTree.en}
                onChange={this.onProductCodesChange}
                searchPlaceholder="Please select"
                treeCheckable={true}
                style={{ width: '100%' }}
                required={true}
              />
            </div>

            {this.renderButton(this.logsSuppliersByProductCodeLogsExport)}
          </Card>
        </Col>

        <Col {...span}>
          <Card title="Menu review by buyer">
            <p>
              <label>Filter interval dates: </label>
              <RangePicker
                onChange={value => this.onInputChange('intervalDate', value)}
                format={dateFormat}
              />
            </p>
            <div>
              <label>Module: </label>
              <Select
                style={{ width: '100%', marginBottom: '16px' }}
                onChange={this.onModuleChange}
              >
                {activityLogOptions}
              </Select>
            </div>

            {this.renderButton(this.logsActivityLogsExport)}
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
