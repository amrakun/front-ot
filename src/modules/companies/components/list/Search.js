import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Input, Icon } from 'antd';

const propTypes = {
  history: PropTypes.object,
  placeholder: PropTypes.string
};

class Search extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);

    const searchQuery = query.search;

    this.state = { search: searchQuery || '' };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.emitEmpty = this.emitEmpty.bind(this);
  }

  handleSearch(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.search = value;

    history.push({
      search: queryString.stringify(query)
    });
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  emitEmpty() {
    this.searchInput.focus();
    this.handleSearch('');
    this.setState({ search: '' });
  }

  render() {
    const { search } = this.state;
    const { placeholder } = this.props;

    const suffix = search ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;

    return (
      <Input
        value={search}
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder={placeholder || 'Supplier name or SAP number'}
        onPressEnter={e => this.handleSearch(e.target.value)}
        onChange={this.handleChange}
        suffix={suffix}
        ref={node => (this.searchInput = node)}
        className="suppliers-search"
      />
    );
  }
}

Search.propTypes = propTypes;

export default withRouter(Search);
