import React from 'react';
import PropTypes from 'prop-types';
import { Tender } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';

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
    this.award = this.award.bind(this);
  }

  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter);
    this.setState({ pagination });
  }

  award(companyId) {
    const { tendersAward, tenderDetailQuery } = this.props;
    tendersAward({
      variables: {
        _id: tenderDetailQuery.tenderDetail._id,
        supplierId: companyId
      }
    })
      .then(() => {
        console.log('Saved');
      })
      .catch(error => {
        console.log(error);
      });
  }

  bidSummaryReport(companies) {
    console.log(companies);
  }

  sendRegretLetter(companies) {
    console.log(companies);
  }

  render() {
    const { tenderDetailQuery } = this.props;
    if (tenderDetailQuery.loading) {
      return <Tender loading={true} />;
    }

    const { pagination } = this.state;

    const updatedProps = {
      ...this.props,
      award: this.award,
      bidSummaryReport: this.bidSummaryReport,
      sendRegretLetter: this.sendRegretLetter,
      data: tenderDetailQuery.tenderDetail,
      loading: false,
      pagination: {
        // total: tenderDetailQuery.tenderDetail.suppliersIds.length,
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
  tendersAward: PropTypes.func
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

  graphql(gql(mutations.tendersAward), {
    name: 'tendersAward'
  })
)(TenderContainer);
