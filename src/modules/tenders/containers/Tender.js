import React from 'react';
import PropTypes from 'prop-types';
import { Tender } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries } from '../graphql';

class TenderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter);
    this.setState({ pagination });
  }

  award(company) {
    console.log(company);
  }

  bidSummaryReport(companies) {
    console.log(companies);
  }

  sendRegretLetter(companies) {
    console.log(companies);
  }

  render() {
    const { tenderDetailQuery, companiesQuery } = this.props;
    if (tenderDetailQuery.loading || companiesQuery.loading) {
      return <Tender loading={true} />;
    }

    const { pagination } = this.state;

    const updatedProps = {
      ...this.props,
      award: this.award,
      bidSummaryReport: this.bidSummaryReport,
      sendRegretLetter: this.sendRegretLetter,
      data: companiesQuery.companies,
      tenderDetail: tenderDetailQuery.tenderDetail,
      loading: false,
      pagination: {
        total: companiesQuery.companies.length,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <Tender {...updatedProps} />;
  }
}

TenderContainer.propTypes = {
  tenderDetailQuery: PropTypes.object,
  companiesQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenderDetail), {
    name: 'tenderDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id }
      };
    }
  }),

  graphql(gql(queries.companies), {
    name: 'companiesQuery',
    options: ({ queryParams }) => {
      return {
        variables: {
          page: 200,
          perPage: 20
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(TenderContainer);
