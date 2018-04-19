import React from 'react';
import PropTypes from 'prop-types';
import { BuyerTenders } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import client from 'apolloClient';
import { notification, Icon, Button, message } from 'antd';
import { notifyReady, notifyLoading } from 'modules/common/constants';

class TendersContainer extends React.Component {
  constructor(props) {
    super(props);

    const { location, type } = props;

    this.type = 'rfq';

    if (type === 'eoi' || (location && location.pathname === '/eoi'))
      this.type = 'eoi';

    this.state = {
      tenders: []
    };

    this.exportTenders = this.exportTenders.bind(this);
    this.cancelTender = this.cancelTender.bind(this);
  }

  componentWillMount() {
    const { tendersTableQuery } = this.props;
    const location = this.props.location || {};

    if (location.search === '?refetch') {
      tendersTableQuery.refetch();
    }
  }

  exportTenders() {
    const { queryParams, type, supplierId } = this.props;

    notification.open(notifyLoading);
    this.setState({ exportLoading: true });

    client
      .query({
        query: gql(queries.exportTenders),
        name: 'exportTenders',

        variables: {
          search: queryParams ? queryParams.search : '',
          status: queryParams ? queryParams.status : '',
          type: type,
          supplierId: supplierId,
          ignoreSubmitted: queryParams ? queryParams.ignoreSubmitted : ''
        }
      })
      .then(response => {
        notification.close('loadingNotification');
        notification.open({
          ...notifyReady,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.close('downloadNotification');
                window.open(response.data[Object.keys(response.data)[0]]);
              }}
            >
              <Icon type="download" /> Download
            </Button>
          )
        });
        this.setState({ exportLoading: false });
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  cancelTender(_id) {
    const { tendersCancel, tendersTableQuery } = this.props;

    tendersCancel({
      variables: { _id }
    })
      .then(() => {
        tendersTableQuery.refetch();
        message.success('Canceled a tender');
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  render() {
    const { tendersTableQuery, tendersCountQuery } = this.props;

    if (tendersTableQuery.loading || tendersCountQuery.loading) {
      return <BuyerTenders loading={true} />;
    }

    const { exportLoading } = this.state;
    const tenders = tendersTableQuery.tenders || [];
    const totalCount = tendersCountQuery.tendersBuyerTotalCount || 0;

    const updatedProps = {
      ...this.props,
      exportLoading,
      totalCount,
      cancelTender: this.cancelTender,
      data: tenders,
      type: this.type,
      exportTenders: this.exportTenders
    };

    return <BuyerTenders {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object,
  history: PropTypes.object,
  tendersTableQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func,
  tendersCancel: PropTypes.func,
  queryParams: PropTypes.object,
  supplierId: PropTypes.string,
  tendersCountQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenders), {
    name: 'tendersTableQuery',
    options: ({ type, queryParams }) => {
      return {
        variables: {
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 15,
          search: queryParams ? queryParams.search : '',
          status: queryParams ? queryParams.status : '',
          type: type,
          month: queryParams ? queryParams.month : ''
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(queries.totalBuyerTenders), {
    name: 'tendersCountQuery',
    options: ({ type, queryParams }) => {
      return {
        variables: {
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 15,
          search: queryParams ? queryParams.search : '',
          status: queryParams ? queryParams.status : '',
          type: type,
          month: queryParams ? queryParams.month : ''
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  }),

  graphql(gql(mutations.tendersCancel), {
    name: 'tendersCancel'
  })
)(TendersContainer);
