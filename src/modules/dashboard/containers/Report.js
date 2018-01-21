import React from 'react';
import PropTypes from 'prop-types';
import { queries } from '../graphql';
import { Report } from '../components';
import { gql } from 'react-apollo';
import client from 'apolloClient';
import { notifyReady, notifyLoading } from 'modules/common/constants';
import { notification, Icon, Button, message } from 'antd';

class ReportContainer extends React.Component {
  constructor(props) {
    super(props);

    this.export = this.export.bind(this);
  }

  export(name, variables) {
    notification.open(notifyLoading);
    this.setState({ exportLoading: true });

    client
      .query({
        query: gql(queries[name]),
        name: 'export',

        variables: variables
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
    const updatedProps = {
      ...this.props,
      export: this.export
    };

    return <Report {...updatedProps} />;
  }
}

ReportContainer.propTypes = {
  location: PropTypes.object
};

export default ReportContainer;
