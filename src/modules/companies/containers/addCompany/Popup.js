import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { mutations } from '../../graphql';
import Popup from '../../components/addCompany/Popup';
import { message } from 'antd';

const PopupContainer = props => {
  const { registerViaBuyer, onOk } = props;

  const registerSupplier = variables => {
    registerViaBuyer({ variables })
      .then(payload => {
        const data = payload.data.registerViaBuyer;
        message.success(
          <span>
            Invitation email for&nbsp;
            <strong>{data.company.basicInfo.enName}</strong>&nbsp; has been sent
            to <strong>{data.user.email}</strong>
          </span>
        );
        onOk(data.company);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  return <Popup {...{ ...props, registerSupplier }} />;
};

PopupContainer.propTypes = {
  registerViaBuyer: PropTypes.func,
  onOk: PropTypes.func
};

export default compose(
  graphql(gql(mutations.registerViaBuyer), {
    name: 'registerViaBuyer'
  })
)(PopupContainer);
