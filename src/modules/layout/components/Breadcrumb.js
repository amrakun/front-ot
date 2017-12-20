import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { PropTypes } from 'prop-types';
import { paths } from 'modules/common/paths';

const Breadcrumbs = location => {
  const breadcrumbItems = [];
  breadcrumbItems.push(
    <Breadcrumb.Item>
      <Icon type="home" />
    </Breadcrumb.Item>
  );
  paths.some(path => {
    if (location.pathname.includes(path.path)) {
      path.breadcrumb.forEach(i => {
        breadcrumbItems.push(<Breadcrumb.Item>{i}</Breadcrumb.Item>);
      });
      return true;
    }
  });
  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

Breadcrumbs.propTypes = {
  location: PropTypes.object
};

export default Breadcrumbs;
