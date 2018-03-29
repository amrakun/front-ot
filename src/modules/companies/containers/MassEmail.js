import React from 'react';
import PropTypes from 'prop-types';
import { MassEmail } from '../components';
import { gql, graphql } from 'react-apollo';
import { message } from 'antd';
import { mutations } from '../graphql';

const MassEmailContainer = props => {
  const { sendEmail } = props;

  const sendMassEmail = variables => {
    sendEmail({ variables })
      .then(() => {
        message.success('Successfully sent emails');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const extendedProps = {
    ...props,
    sendMassEmail
  };

  return <MassEmail {...extendedProps} />;
};

MassEmailContainer.propTypes = {
  queryParams: PropTypes.object,
  sendEmail: PropTypes.func
};

export default graphql(gql(mutations.sendEmail), {
  name: 'sendEmail'
})(MassEmailContainer);
