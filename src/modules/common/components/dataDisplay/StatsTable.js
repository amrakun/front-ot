import React from 'react';
import PropTypes from 'prop-types';

const StatsTable = ({ stats, tabs, title }) => {
  const renderRow = name => {
    return (
      <tr key={name}>
        <td>{tabs[name]}</td>
        <td>{stats[name]}</td>
      </tr>
    );
  };

  return (
    <div className="stats-table-wrapper">
      {title && <p>{title}</p>}

      <table className="stats">
        <tbody>{Object.keys(stats).map(key => renderRow(key))}</tbody>
      </table>
    </div>
  );
};

StatsTable.propTypes = {
  stats: PropTypes.object,
  tabs: PropTypes.object,
  title: PropTypes.node
};

export default StatsTable;
