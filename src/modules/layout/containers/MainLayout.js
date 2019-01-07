import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { MainLayout } from '../components';
import { withSystemConfig, withCurrentUser } from 'modules/auth/containers';
import { withRouter } from 'react-router-dom';
import { logout } from '../utils';
import { mutations } from '../graphql';

class MainLayoutContainer extends React.Component {
  componentDidMount() {
    if (this.props.currentUser) {
      const idleLogout = () => {
        let time;

        const resetTimer = () => {
          clearTimeout(time);
          time = setTimeout(logout, 20 * 60000); // 20 minutes
        };

        window.onload = resetTimer;
        window.onmousemove = resetTimer;
        window.onmousedown = resetTimer; // catches touchscreen presses
        window.onclick = resetTimer; // catches touchpad clicks
        window.onscroll = resetTimer; // catches scrolling with arrow keys
        window.onkeypress = resetTimer;
      };

      idleLogout();
    }
  }

  render() {
    const pathname = window.location.pathname;
    const { currentUser } = this.props;

    if (currentUser && currentUser.isSupplier) {
      const checkUrl = url => {
        if (pathname === url || pathname === `${url}/`) {
          throw new Error('Permission denied');
        }
      };

      try {
        checkUrl('/dashboard');
        checkUrl('/companies');
        checkUrl('/prequalification-status');
        checkUrl('/capacity-building-status');
        checkUrl('/audit');
        checkUrl('/audit/responses');
        checkUrl('/audit/responses-physical');
        checkUrl('/audit/reports');
        checkUrl('/validation');
        checkUrl('/difot');
        checkUrl('/due-diligence');
        checkUrl('/feedback');
        checkUrl('/feedback/responses');
        checkUrl('/blocking');
        checkUrl('/rfq');
        checkUrl('/srfq');
        checkUrl('/eoi');
        checkUrl('/report');
        checkUrl('/logs');
        checkUrl('/settings/templates');
        checkUrl('/settings/manage-expiry-dates');
        checkUrl('/user-list');
        checkUrl('/mail-deliveries');
        checkUrl('/delegation');
      } catch (e) {
        if (e.message === 'Permission denied') {
          return null;
        }
      }
    }

    return <MainLayout {...this.props} />;
  }
}

MainLayoutContainer.propTypes = {
  currentUser: PropTypes.object,
  logsWriteMutation: PropTypes.func.isRequired
};

const BuyerLayout = withSystemConfig(MainLayoutContainer);

const withUser = props => {
  const { currentUser } = props;

  if (currentUser && !currentUser.isSupplier) {
    return <BuyerLayout {...props} />;
  }

  return <MainLayoutContainer {...props} />;
};

export default compose(
  graphql(gql(mutations.logsWrite), {
    name: 'logsWriteMutation'
  })
)(withRouter(withCurrentUser(withUser)));
