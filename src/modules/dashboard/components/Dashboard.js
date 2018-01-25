import React from 'react';
import { Card, Tabs } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Tenders } from 'modules/tenders/containers';

class Dashboard extends React.Component {
  renderTierType() {
    const data = this.props.companiesByTierType;
    const width = 400 * 0.8;
    const height = width * 0.6;

    const COLORS = ['#A389D4', '#F5C22B', '#1dcaff', '#3B5998', '#ccc'];

    return (
      <Card title="SUPPLIER BY TIER TYPE" style={{ width: 400 }}>
        <PieChart width={800} height={400}>
          <Pie
            data={data}
            dataKey="value"
            cx={width * 0.5}
            cy={height * 0.5}
            label
            labelLine={false}
            outerRadius={height * 0.48}
            fill="#8884d8"
          />
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </PieChart>
      </Card>
    );
  }

  render() {
    const props = this.props;
    const queryParams = queryString.parse(props.location.search);
    const extendedProps = { ...props, queryParams };

    return (
      <Tabs animated={false}>
        <Tabs.TabPane tab="Dashboard" key="1">
          {this.renderTierType()}
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
  location: PropTypes.object
};

export default Dashboard;
