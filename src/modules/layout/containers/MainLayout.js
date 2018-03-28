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
    return <MainLayout {...this.props} />;
  }
}

MainLayoutContainer.propTypes = {
  currentUser: PropTypes.object,
  logsWriteMutation: PropTypes.func.isRequired
};

export default compose(
  graphql(gql(mutations.logsWrite), {
    name: 'logsWriteMutation'
  })
)(withRouter(withSystemConfig(withCurrentUser(MainLayoutContainer))));
