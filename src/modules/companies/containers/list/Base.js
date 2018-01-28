import React from 'react';
import { message, notification, Icon, Button } from 'antd';
import { gql } from 'react-apollo';
import PropTypes from 'prop-types';
import { BaseList } from '../../components';
import { queries } from '../../graphql';
import generator from './generator';
import client from 'apolloClient';
import { notifyReady, notifyLoading } from 'modules/common/constants';

class BaseListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      exportLoading: false
    };
  }

  render() {
    const { queryParams } = this.props;

    const exportCompanies = companies => {
      notification.open(notifyLoading);
      this.setState({ exportLoading: true });

      client
        .query({
          query: gql(queries.exportCompanies),
          name: 'exportCompanies',

          variables: {
            search: queryParams.search,
            region: queryParams.region,
            status: queryParams.status,
            productCodes: queryParams.productCodes,
            _ids: companies
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
    };

    const exportCompany = _id => {
      notification.open(notifyLoading);

      client
        .query({
          query: gql(queries.exportCompany),
          name: 'exportCompany',

          variables: { _id }
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
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      exportCompany,
      exportCompanies,
      exportLoading: this.state.exportLoading
    };

    return <BaseList {...extendedProps} />;
  }
}

BaseListContainer.propTypes = {
  companiesQuery: PropTypes.object,
  queryParams: PropTypes.object
};

export default generator(BaseListContainer, 'companies');
