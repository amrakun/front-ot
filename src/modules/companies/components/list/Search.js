import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Input } from 'antd';

const propTypes = {
  history: PropTypes.object
};

class Search extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);

    const searchQuery = query.search;

    this.state = { search: searchQuery || '' };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.search = value;

    history.push({
      pathname: '/companies',
      search: queryString.stringify(query)
    });
  }

  render() {
    const { search } = this.state;

    return (
      <Input.Search
        defaultValue={search}
        placeholder="Supplier name or SAP number"
        style={{ width: 200, float: 'left' }}
        onSearch={value => this.handleSearch(value)}
      />
    );
  }
}

Search.propTypes = propTypes;

export default withRouter(Search);
