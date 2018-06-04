import React from 'react';
import { TreeSelect } from 'antd';
import productsTree from './constants';

export default class ProductsTree extends React.Component {
  render() {
    const { locale = 'en' } = this.context;

    return (
      <TreeSelect
        allowClear
        treeCheckable={true}
        searchPlaceholder="Please select"
        treeData={productsTree[locale]}
        {...this.props}
      />
    );
  }
}
