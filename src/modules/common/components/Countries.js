import React from 'react'
import { Select } from 'antd'

const Option = Select.Option;

const json = {
   "mn":{
      "label":"Mongolia",
      "value":"0"
   },
   "cn":{
      "label":"China",
      "value":"1"
   }
}

class Countries extends React.Component {
  render() {
    const arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });
    return (
      <Select>{arr.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}</Select>
    )
  }
}

export default Countries;
