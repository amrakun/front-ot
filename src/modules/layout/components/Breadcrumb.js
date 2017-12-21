import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { PropTypes } from 'prop-types';
import { paths } from 'modules/common/paths';

const Breadcrumbs = location => {
  const breadcrumbItems = [];
  breadcrumbItems.push(
    <Breadcrumb.Item key={0}>
      <Icon type="home" />
    </Breadcrumb.Item>
  );
  paths.every(path => {
    if (location.pathname.includes(path.path)) {
      try {
        path.breadcrumb.forEach(i => {
          breadcrumbItems.push(<Breadcrumb.Item key={i}>{i}</Breadcrumb.Item>);
        });
      } catch (e) {
        return true;
      }
      return false;
    }
    return true;
  });
  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

Breadcrumbs.propTypes = {
  location: PropTypes.object
};

export default Breadcrumbs;
