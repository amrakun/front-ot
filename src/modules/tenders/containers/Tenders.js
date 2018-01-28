import React from 'react';
import PropTypes from 'prop-types';
import { Tenders } from '../components';
import { gql, graphql, compose } from 'react-apollo';
import { queries, mutations } from '../graphql';
import { message } from 'antd';
import client from 'apolloClient';
import { notification, Icon, Button } from 'antd';
import { notifyReady, notifyLoading } from 'modules/common/constants';
import { withTableProps } from 'modules/common/containers';

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
  }

  componentWillMount() {
    const { tendersQuery } = this.props;
    const location = this.props.location || {};

    if (location.search === '?refetch') {
      tendersQuery.refetch();
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
          supplierId: currentUser.companyId,
          isNotInterested: true
        }
      })
        .then(() => {
          message.success('Not interested tender has been removed');
          tendersQuery.refetch();
        })
        .catch(error => {
          message.error('Error occurred' + error);
        });
    };

    const { exportLoading } = this.state;
    const tenders = tendersQuery.tenders || [];

    const updatedProps = {
      ...this.props,
      exportLoading,
      data: tenders,
      type: this.type,
      notInterested: notInterested,
      currentUser: currentUser,
      exportTenders: this.exportTenders
    };

    return <Tenders {...updatedProps} />;
  }
}

TendersContainer.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object,
  history: PropTypes.object,
  tendersQuery: PropTypes.object,
  tendersResponsesAdd: PropTypes.func,
  queryParams: PropTypes.object,
  supplierId: PropTypes.string
};

TendersContainer.contextTypes = {
  currentUser: PropTypes.object
};

export default compose(
  graphql(gql(queries.tenders), {
    name: 'tendersQuery',
    options: ({ type, supplierId, queryParams }) => {
      return {
        variables: {
          page: 1,
          perPage: 1,
          search: queryParams ? queryParams.search : '',
          status: queryParams ? queryParams.status : '',
          type: type,
          supplierId: supplierId,
          ignoreSubmitted: queryParams ? queryParams.ignoreSubmitted : ''
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.tendersResponsesAdd), {
    name: 'tendersResponsesAdd'
  })
)(withTableProps(TendersContainer));
