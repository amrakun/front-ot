import React from 'react';
import { Card, Tabs, DatePicker, Badge, TreeSelect } from 'antd';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Tenders } from 'modules/tenders/containers';
import moment from 'moment';
import productsTree from 'modules/companies/productsTree';

const COLORS = ['#52c41a', '#faad14', '#1890ff', '#f5222d', '#f47721'];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pieChartWidth: 400,
      pieChartHeight: 400,
      productWidth: 800
    };

    this.onProductCodesChange = this.onProductCodesChange.bind(this);
  }

  componentDidMount() {
    const { clientWidth } = this.pieWrapper;

    this.setState({
      pieChartWidth: clientWidth,
      productWidth: this.productWrapper.clientWidth
    });
  }

  onProductCodesChange(value) {
    this.handleSearch('productCodes', value);
  }

  handleSearch(key, value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query[key] = value;

    history.push({
      search: queryString.stringify(query)
    });
  }

  renderTierType() {
    const data = this.props.companiesByTierType;
    const width = this.state.pieChartWidth * 0.9;
    const height = width * 0.8;

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <Card title="SUPPLIER BY TIER TYPE">
        <div className="pie-chart-labels">
          onProductCodesChange
          {data.map((detail, index) => (
            <span key={index} className="chart-text">
              <Badge
                count={detail.value}
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <label>{detail.name}</label>
            </span>
          ))}
        </div>

        <PieChart width={width} height={height}>
          <Pie
            data={data}
            dataKey="value"
            cx={width * 0.5}
            cy={height * 0.5}
            label={renderCustomizedLabel}
            labelLine={false}
            outerRadius={height * 0.48}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </Card>
    );
  }

  renderPrequalified() {
    const { productData, location } = this.props;
    const width = this.state.productWidth * 0.9;
    const height = this.state.pieChartWidth * 0.75;
    const queryParams = queryString.parse(location.search);

    return (
      <Card
        title="PRODUCT & SERVICE CODE"
        extra={
          <TreeSelect
            treeData={productsTree}
            value={queryParams.productCodes}
            onChange={this.onProductCodesChange}
            treeCheckable={true}
            searchPlaceholder="Please select"
            style={{ width: 300 }}
          />
        }
      >
        <BarChart width={width} height={height} data={productData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="prequalified" stackId="a" fill={COLORS[1]} />
          <Bar dataKey="registered" stackId="a" fill={COLORS[0]} />
        </BarChart>
      </Card>
    );
  }

  render() {
    const props = this.props;
    const queryParams = queryString.parse(props.location.search);
    const extendedProps = { ...props, queryParams };
    const dateFormat = 'YYYY/MM/DD';
    const now = new Date();

    return (
      <Tabs animated={false}>
        <Tabs.TabPane tab="Dashboard" key="1">
          <div className="chart-wrapper">
            <div className="chart-filter">
              <DatePicker
                className="chart-filter-input"
                placeholder="Publish date"
                defaultValue={moment(now, dateFormat)}
                format={dateFormat}
                onChange={(d, date) => this.handleSearch('startDate', date)}
              />
              <DatePicker
                className="chart-filter-input"
                placeholder="Close date"
                defaultValue={moment(now, dateFormat)}
                format={dateFormat}
                onChange={(d, date) => this.handleSearch('endDate', date)}
              />
            </div>

            <div className="ant-row chart-row">
              <div
                className="ant-col-sm-12 ant-col-lg-16"
                ref={element => {
                  this.productWrapper = element;
                }}
              >
                {this.renderPrequalified()}
              </div>
              <div
                className="ant-col-sm-12 ant-col-lg-8"
                ref={element => {
                  this.pieWrapper = element;
                }}
              >
                {this.renderTierType()}
              </div>
            </div>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="My dashboard" key="2">
          <Tenders type="eoi" {...extendedProps} />
          <Tenders type="rfq" {...extendedProps} />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

Dashboard.propTypes = {
  companiesByTierType: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
  productData: PropTypes.array
};

export default Dashboard;
