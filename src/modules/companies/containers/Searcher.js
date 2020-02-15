import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../graphql';
import Searcher from '../components/Searcher';

const SearcherContainer = props => {
  const companiesQuery = props.companiesQuery || {};
  const optionsSuppliers = companiesQuery.companies || [];

  return <Searcher {...{ ...props, optionsSuppliers }} />;
};

SearcherContainer.propTypes = {
  companiesQuery: PropTypes.object,
  onShowPopup: PropTypes.func,
};

const WithData = compose(
  graphql(gql(queries.simpleCompanies), {
    name: 'companiesQuery',
    skip: ({ isPopupVisible }) => !isPopupVisible,
    options: ({ search }) => {
      return {
        variables: { search, source: 'searcher', perPage: 10 },
        fetchPolicy: 'network-only',
      };
    },
  })
)(SearcherContainer);

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopupVisible: false,
      search: '',
    };

    this.onShowPopup = this.onShowPopup.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onShowPopup() {
    this.setState({ isPopupVisible: true });
  }

  onSearch(search) {
    this.setState({ search });
  }

  render() {
    const { isPopupVisible, search } = this.state;

    return (
      <WithData
        {...this.props}
        search={search}
        isPopupVisible={isPopupVisible}
        onSearch={this.onSearch}
        onShowPopup={this.onShowPopup}
      />
    );
  }
}
