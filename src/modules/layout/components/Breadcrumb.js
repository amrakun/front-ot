import React from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

const Breadcrumbs = props => {
  if (props.currentUser)
    return (
      <Breadcrumb>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
    );
  else return null;
};

Breadcrumbs.propTypes = {
  currentUser: PropTypes.object
};

export default Breadcrumbs;
