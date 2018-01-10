import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Tenders } from '../../tenders/containers';

const Dashboard = props => {
  const queryParams = queryString.parse(props.location.search);
  const extendedProps = { ...props, queryParams };

  return (
    <div>
      <Tenders type="rfq" {...extendedProps} />
      <Tenders type="eoi" {...extendedProps} />
    </div>
  );
};

Dashboard.propTypes = {
  location: PropTypes.object
};

export default Dashboard;
