import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  history: PropTypes.object,
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

export default class Common extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedCompanies: [] };

    this.onSelectedCompaniesChange = this.onSelectedCompaniesChange.bind(this);
  }

  onSelectedCompaniesChange(selectedCompanies) {
    this.setState({ selectedCompanies });
  }
}

Common.propTypes = propTypes;
