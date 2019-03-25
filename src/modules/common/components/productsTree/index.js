import React from 'react';
import PropTypes from 'prop-types';
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
        filterTreeNode={(search, { props }) => {
          return (props.title.toLowerCase()).includes(search.toLowerCase());
        }}
        dropdownClassName='products-tree-select'
        {...this.props}
      />
    );
  }
}

ProductsTree.contextTypes = {
  locale: PropTypes.string
};
