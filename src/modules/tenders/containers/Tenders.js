import React from 'react';
import PropTypes from 'prop-types';
import { Tenders } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';

class TendersContainer extends React.Component {
  constructor(props) {
    super(props);

    const { location, type } = props;

    this.type = 'rfq';
    if (type === 'eoi' || (location && location.pathname === '/eoi'))
      this.type = 'eoi';

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      },
      tenders: []
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter);
    this.setState({ pagination });
  }

  render() {
    const { tendersQuery, tendersResponsesAdd } = this.props;
    const { currentUser } = this.context;

    if (tendersQuery.loading) {
      return <Tenders loading={true} />;
    }

    const notInterested = tenderId => {
      tendersResponsesAdd({
        variables: {
          tenderId: tenderId,
          supplierId: currentUser._id,
          isNotInterested: true
        }
      })
        .then(() => {
          console.log('Saved');
          tendersQuery.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    };

    const { pagination } = this.state;
    const tenders = tendersQuery.tenders || [];

    const updatedProps = {
      ...this.props,
      data: tenders,
      pagination: {
        total: tenders.length,
        pageSize: pagination.pageSize,
        current: pagination.current
      },
      type: this.type,
      loading: false,
      notInterested: notInterested,
      supplier: currentUser.isSupplier,
      onChange: (pagination, filters, sorter) =>
        this.handleTableChange(pagination, filters, sorter)
    };

    return <Tenders {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object,
  tendersQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func
};

TendersContainer.contextTypes = {
  currentUser: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenders), {
    name: 'tendersQuery',
    options: ({ type, supplierId }) => {
      return {
        variables: {
          page: 200,
          perPage: 20,
          type: type,
          supplierId: supplierId
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  })
)(TendersContainer);
