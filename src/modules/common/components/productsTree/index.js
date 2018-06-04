import React from 'react';
import { TreeSelect } from 'antd';
import productsTree from './constants';

export default class ProductsTree extends React.Component {
  render() {
    const { locale = 'en' } = this.context;

    const treeData = productsTree[locale];

    return (
      <TreeSelect
        allowClear
        multiple
        treeCheckStrictly
        searchPlaceholder="Please select"
        treeData={treeData}
        {...this.props}
      />
    );
  }
}
