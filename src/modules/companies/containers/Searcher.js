import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../graphql';
import Searcher from '../components/Searcher';

const SearcherContainer = props => {
  const companiesQuery = props.companiesQuery || {};
  const suppliers = companiesQuery.companies || [];

  return <Searcher {...{ ...props, suppliers }} />;
};

SearcherContainer.propTypes = {
  companiesQuery: PropTypes.object,
  onShowPopup: PropTypes.func
};

const WithData = compose(
  graphql(gql(queries.simpleCompanies), {
    name: 'companiesQuery',
    skip: ({ isPopupVisible }) => !isPopupVisible,
    options: () => {
      return {
        variables: { search: '', source: 'searcher' }
      };
    }
  })
)(SearcherContainer);

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopupVisible: false
    };

    this.onShowPopup = this.onShowPopup.bind(this);
  }

  onShowPopup() {
    this.setState({ isPopupVisible: true });
  }

  render() {
    return (
      <WithData
        {...this.props}
        isPopupVisible={this.state.isPopupVisible}
        onShowPopup={this.onShowPopup}
      />
    );
  }
}
