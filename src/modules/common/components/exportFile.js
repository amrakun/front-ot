import React from 'react';
import { message, notification, Button, Icon } from 'antd';
import { gql } from 'react-apollo';
import { notifyReady, notifyLoading } from 'modules/common/constants';
import client from 'apolloClient';

const exportExcel = props => {
  const { query, variables, onFinish, name = 'downloadQuery' } = props;

  notification.open(notifyLoading);

  client
    .query({
      query: gql(query),
      name,
      variables
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
              window.open(`${response.data[Object.keys(response.data)[0]]}`);
            }}
          >
            <Icon type="download" /> Download
          </Button>
        )
      });

      if (onFinish) onFinish();
    })
    .catch(error => {
      message.error(error.message);
    });
};

export default exportExcel;
