import React from 'react';
import { Status } from '../../components';
import generator from './generator';

class StatusContainer extends React.Component {
  render() {
    return <Status {...this.props} />;
  }
}
export default generator(StatusContainer, 'status');
