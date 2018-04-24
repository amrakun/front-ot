import React from 'react';
import { Card, Tabs, DatePicker, Badge, TreeSelect, Button } from 'antd';
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
  Legend,
  ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Tenders } from 'modules/tenders/containers';
import moment from 'moment';
import productsTree from 'modules/companies/productsTree';
import { colors } from 'modules/common/constants';
import router from 'modules/common/router';
import { productCategoryLabels } from 'modules/dashboard/constants';

const { MonthPicker } = DatePicker;

const COLORS = [colors[2], colors[3], colors[4], colors[6], colors[8]];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pieChartWidth: 400,
      pieChartHeight: 400
    };

    this.onProductCodesChange = this.onProductCodesChange.bind(this);
    this.handleByMonth = this.handleByMonth.bind(this);
  }

  componentDidMount() {
    const { clientWidth } = this.pieWrapper;

    this.setState({ pieChartWidth: clientWidth });
  }

  onProductCodesChange(value) {
    this.handleSearch('productCodes', value);
  }

  handleByMonth(bool) {
    if (!bool) {
      router.setParams(this.props.history, {
        filter: 'byMonth'
      });
    } else {
      router.removeParams(this.props.history, 'filter');
    }
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
      <Card title="Suppliers By Tier Type">
        <div className="pie-chart-labels">
          {data.map((detail, index) => (
            <span key={index} className="chart-text">
              <Badge
                count={detail.value}
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <label style={{ textTransform: 'uppercase' }}>
                {detail.name === 'umnugovi' ? 'umnugobi' : detail.name}
              </label>
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

  renderBarChart({ data, content, height }) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {content}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  renderProductCategory() {
    const { productCategory } = this.props;
    const height = this.state.pieChartWidth * 0.5;

    const data = productCategory.map(cat => ({
      ...cat,
      name: productCategoryLabels[cat.name]
    }));

    return (
      <Card title="Suppliers by Category" className="barchart-wrapper margin">
        {this.renderBarChart({
          data,
          height,
          content: [
            <Bar
              name="Prequalified"
              key={1}
              dataKey="prequalified"
              stackId="a"
              fill={COLORS[0]}
            />,

            <Bar
              name="Registered"
              key={2}
              dataKey="registered"
              stackId="a"
              fill={COLORS[1]}
            />,

            <Bar
              name="Validated"
              key={3}
              dataKey="validated"
              stackId="a"
              fill={COLORS[2]}
            />
          ]
        })}
      </Card>
    );
  }

  renderPrequalified() {
    const { productData, location } = this.props;
    const data = regVsPreq ? this.groupData(productData) : productData;
    const height = this.state.pieChartWidth * 0.8;
    const queryParams = queryString.parse(location.search);
    const { regVsPreq } = this.state;

    return (
      <Card
        title="Suppliers by Qualification Status"
        className="barchart-wrapper"
        extra={
          <TreeSelect
            treeData={productsTree.en}
            value={queryParams.productCodes}
            onChange={this.onProductCodesChange}
            treeCheckable={true}
            searchPlaceholder="Please select"
            style={{ width: 300 }}
          />
        }
      >
        {this.renderBarChart({
          data,
          height,
          content: [
            <Bar
              name="Registered"
              key={1}
              dataKey="registered"
              stackId="a"
              fill={COLORS[0]}
            />,

            <Bar
              name="Prequalified"
              key={2}
              dataKey="prequalified"
              stackId="a"
              fill={COLORS[1]}
            />,

            <Bar
              name="Not-prequalified"
              key={3}
              dataKey="notPrequalified"
              stackId="a"
              fill={COLORS[2]}
            />,

            <Bar
              name="Pending qualification"
              key={4}
              dataKey="prequalificationPending"
              stackId="a"
              fill={COLORS[3]}
            />
          ]
        })}
      </Card>
    );
  }

  renderCountData(title, count) {
    return (
      <Card title={title}>
        <div className="chart-count">{count}</div>
      </Card>
    );
  }

  render() {
    const {
      eoiData,
      rfqData,
      eoiTotalCount,
      rfqTotalCount,
      eoiAverageDuration,
      rfqAverageDuration,
      location: { search }
    } = this.props;

    const queryParams = queryString.parse(search);
    const dateFormat = 'YYYY/MM';

    return (
      <Tabs animated={false}>
        <Tabs.TabPane tab="Dashboard" key="1">
          <div className="chart-wrapper">
            <div className="chart-filter">
              <MonthPicker
                className="chart-filter-input"
                placeholder="Start month"
                defaultValue={
                  queryParams.startDate
                    ? moment(queryParams.startDate, dateFormat)
                    : null
                }
                onChange={(d, date) => this.handleSearch('startDate', date)}
                format={dateFormat}
              />

              <MonthPicker
                className="chart-filter-input"
                placeholder="End month"
                defaultValue={
                  queryParams.endDate
                    ? moment(queryParams.endDate, dateFormat)
                    : null
                }
                onChange={(d, date) => this.handleSearch('endDate', date)}
                format={dateFormat}
              />

              <Button
                className="chart-filter-input"
                onClick={() =>
                  this.handleByMonth(queryParams.filter === 'byMonth')
                }
                key={1}
              >
                {queryParams.filter === 'byMonth' ? 'By day' : 'By month'}
              </Button>
            </div>

            <div className="ant-row chart-row">
              <div className="ant-col-sm-12 ant-col-lg-16">
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

            {this.renderProductCategory()}

            <div className="ant-row chart-row margin">
              <div className="ant-col-sm-24 ant-col-lg-5">
                {this.renderCountData('Total EOI', eoiTotalCount)}
              </div>
              <div className="ant-col-sm-24 ant-col-lg-14">
                <Card title="EOI (this year)" className="barchart-wrapper">
                  {this.renderBarChart({
                    data: eoiData,
                    height: 200,
                    content: [
                      <Bar
                        name="Open"
                        key={1}
                        dataKey="open"
                        stackId="a"
                        fill={COLORS[0]}
                      />,

                      <Bar
                        name="Closed"
                        key={1}
                        dataKey="closed"
                        stackId="a"
                        fill={COLORS[1]}
                      />
                    ]
                  })}
                </Card>
              </div>
              <div className="ant-col-sm-24 ant-col-lg-5">
                {this.renderCountData(
                  'EOI average duration /days/',
                  Math.round(eoiAverageDuration)
                )}
              </div>
            </div>

            {/* <div className="ant-row chart-row"> */}
            {/*   <div className="ant-col-sm-24 ant-col-lg-5"> */}
            {/*     {this.renderCountData('Total RFQ', rfqTotalCount)} */}
            {/*   </div> */}
            {/*   <div className="ant-col-sm-24 ant-col-lg-14"> */}
            {/*     <Card title="RFQ (this year)" className="barchart-wrapper"> */}
            {/*       {this.renderBarChart({ */}
            {/*         data: rfqData, */}
            {/*         key1: 'open', */}
            {/*         key2: 'closed', */}
            {/*         height: 200 */}
            {/*       })} */}
            {/*     </Card> */}
            {/*   </div> */}
            {/*   <div className="ant-col-sm-24 ant-col-lg-5"> */}
            {/*     {this.renderCountData( */}
            {/*       'RFQ average duration /days/', */}
            {/*       Math.round(rfqAverageDuration) */}
            {/*     )} */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="My dashboard" key="2">
          <Tenders type="eoi" {...this.props} />
          {/* <Tenders type="rfq" {...this.props} /> */}
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

Dashboard.propTypes = {
  productCategory: PropTypes.array,
  companiesByTierType: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
  productData: PropTypes.array,
  eoiTotalCount: PropTypes.number,
  rfqTotalCount: PropTypes.number,
  eoiData: PropTypes.array,
  rfqData: PropTypes.array,
  eoiAverageDuration: PropTypes.number,
  rfqAverageDuration: PropTypes.number
};

export default Dashboard;
